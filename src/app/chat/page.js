"use client";
import { useSocket } from "@/context/socketContext";
import { useGetUsersQuery, useUserQuery } from "@/store/api/user";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import { useChatContext } from "@/context/chatContext";
import Lottie from "lottie-react";
import animation from "@/animation/Chat.json";
import newChat from '@/animation/Email Sent.json'


export default function ChatPage() {
    const searchParams = useSearchParams();
    const users = useGetUsersQuery()?.data?.users || [];
    const id = searchParams.get("id");
    const chat = users.filter((u) => id === u._id)[0];
    const currentUser = useUserQuery()?.data?.user;
    const socket = useSocket();
    const [msg, setMsg] = useState("");
    const [Conversation, setConversation] = useState([]);
    const chatEndRef = useRef(null);
    const [emoji, setEmoji] = useState(false);
    const [lastseen, setLastseen] = useState(null);
    const { side, showSide } = useChatContext();

    const scrollToBottom = () => {
        if (!chatEndRef.current) return;

        chatEndRef.current.scrollIntoView({
            behavior: "auto",
        });
    };

    const router = useRouter();
    const handleSend = async (e) => {
        e.preventDefault();
        if (!currentUser._id) return;
        const newMessage = {
            message: msg,
            sender: currentUser._id,
            time: Date.now(),
            seenBy: [currentUser._id],
        };
        setConversation((prev) => [...prev, newMessage]);
        socket.emit("send-message", {
            to: id,
            from: currentUser._id,
            msg,
        });
        socket.emit("onRoom", {
            to: id,
            from: currentUser._id,
        });
        setMsg("");
        setEmoji(false);
    };

    useEffect(() => {
        setEmoji(false)
        const handleConnect = () => {
            if (currentUser?._id) {
                socket.emit("online", currentUser._id);
            }
        };

        socket.on("connect", handleConnect);

        return () => socket.off("connect", handleConnect);
    }, []);

    useEffect(() => {
        setEmoji(false)
        if (currentUser?._id && socket.connected) {
            socket.emit("online", currentUser._id);
        }
    }, [currentUser?._id]);

    useLayoutEffect(() => {
        setEmoji(false)
        scrollToBottom();
    }, [Conversation]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!currentUser || !currentUser._id) return;
            socket.emit("poll-checkseen", {
                to: id,
                from: currentUser._id,
            });
        }, 3000);

        socket.on("checkseen", (data) => {
            const seen = data.filter((u) => u.user != currentUser._id);
            seen[0]?.seen === null
                ? setLastseen(null)
                : setLastseen(moment(seen[0].seen).fromNow());
        });

        return () => {
            clearInterval(interval);
            socket.off("checkseen");
        };
    }, [id, currentUser?._id]);

    useEffect(() => {
        if (!currentUser || !currentUser._id) return;
        if (!id) return;

        const handleConnect = () => {
            socket.emit("online", currentUser._id);
        };
        socket.on("connect", handleConnect);

        socket.emit("leave-all-rooms");
        socket.emit("join-room", {
            to: id,
            from: currentUser._id,
        });
        socket.emit("seen");

        const handleHistory = (data) => {
            setConversation(data);
        };

        const handleReceive = (data) => {
            socket.emit("onRoom", {
                to: id,
                from: currentUser._id,
            });
            setConversation((prev) => [...prev, data]);
        };

        const handleBeforeUnload = () => {
            socket.emit("last");
        };

        const handleCheckSeen = (data) => {
            const seen = data.filter((u) => u.user != currentUser._id);
            seen[0]?.seen === null
                ? setLastseen(null)
                : setLastseen(moment(seen[0].seen).fromNow());
        };

        const handleDisconnect = () => {
            socket.emit("last", currentUser._id);
        };

        socket.on("chat-history", handleHistory);
        socket.on("receive-message", handleReceive);
        socket.on("checkseen", handleCheckSeen);
        socket.on("disconnect", handleDisconnect);
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("chat-history", handleHistory);
            socket.off("receive-message", handleReceive);
            socket.off("checkseen", handleCheckSeen);
            socket.off("disconnect", handleDisconnect);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [currentUser, id]);

    return (
        <div className="relative text-3xl text-black min-h-screen flex flex-col bg-white justify-between items-center">
            {chat ? (
                <>
                    <div className="w-full sticky top-0 rounded-b-xl">
                        <div className=" h-22 w-full flex items-center gap-4 p-4 shadow-sm justify-between bg-white bg-[#30968930]  border border-b-gray-100 border-white">
                            <div className="flex items-center gap-4 ">
                                <div className="rounded-full overflow-hidden p-2 flex gap-8">
                                    <Image
                                        src="/images/chat/menu.svg"
                                        alt="Profile"
                                        height={50}
                                        width={50}
                                        unoptimized
                                        className="min-md:hidden"
                                        onClick={() => showSide(!side)}
                                    />
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API}/${chat.avatar}`}
                                        alt="Profile"
                                        height={60}
                                        width={60}
                                        unoptimized
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-lg font-bold">
                                        {chat.fullName}
                                    </p>
                                    <p className="text-xs faq font-bold">
                                        {lastseen === null
                                            ? "Online"
                                            : "last seen " + lastseen}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-full justify-end w-full p-4">
                        {Conversation.length > 0 ? (
                            Conversation.map((items, index) =>
                                items.sender === currentUser._id ? (
                                    <div
                                        className="w-fit self-end items-end flex-end flex gap-2 flex-col min-w-1/2"
                                        key={index}
                                    >
                                        <div className="flex items-center gap-1">
                                            <p className="border text-gray-500 shadow-lg font-bold border-gray-300 p-4 text-sm rounded-tl-xl rounded-bl-xl rounded-tr-xl">
                                                {items.message}
                                            </p>
                                            <p
                                                className={` ${items.seenBy.length >= 2 ? "text-blue-500 font-bold" : "text-gray-500"} text-sm`}
                                            >
                                                &#10003;
                                            </p>
                                        </div>
                                        <span className="text-xs self-end justify-self-start h-fit text-gray-400 font-bold mr-4 mb-2">
                                            {moment(items.createdAt).fromNow()}
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="w-fit self-start flex flex-col gap-2 min-w-1/2"
                                        key={index}
                                    >
                                        <div className="flex items-start gap-2">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API}/${chat.avatar}`}
                                                alt="Profile"
                                                height={40}
                                                width={40}
                                                unoptimized
                                                className="rounded-full object-cover"
                                            />
                                            <p className="bg text-white font-bold shadow-xl p-4 text-sm rounded-br-xl rounded-bl-xl rounded-tr-xl">
                                                {items.message}
                                            </p>
                                        </div>
                                        <span className="text-xs self-start justify-self-start h-fit text-gray-400 font-bold ml-12 mb-2">
                                            {moment(items.createdAt).fromNow()}
                                        </span>
                                    </div>
                                ),
                            )
                        ) : (
                            <div className="flex flex-col justify-center items-center">
                                <Lottie
                                    animationData={newChat}
                                    loop
                                    autoplay
                                    className="w-72 h-72"
                                />
                                <h2 className="w-3/4 text-center text-base font-bold text-gray-500">
                                    Start Chatting with Candidates from all over
                                    the World with HireHub .
                                </h2>
                            </div>
                        )}
                    </div>
                    <div ref={chatEndRef}></div>
                    <div
                        className={`sticky self-start  bottom-22 left-5 ${emoji ? "block" : "hidden"} transition-all`}
                    >
                        <EmojiPicker
                            className="text-sm"
                            onEmojiClick={(emoji) => {
                                setMsg((prev) => prev + emoji.emoji);
                            }}
                            onBlur={() => setEmoji(false)}
                        />
                    </div>
                    <form
                        onSubmit={handleSend}
                        className="sticky bottom-0 flex gap-4 border border-white border-t-gray-300 p-2 w-full px-8 bg-white"
                    >
                        <Image
                            src="\images\chat\emoji.svg"
                            height={35}
                            width={35}
                            alt="Emoji"
                            className="transition-all"
                            onClick={() => setEmoji(!emoji)}
                        />
                        <textarea
                            type="text"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            placeholder="Type a message here ..."
                            className="resize-none w-full text-base p-2 focus:outline-none focus:ring-0"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <button
                            type="submit"
                            className="flex items-center text-lg bg w-12 h-12 justify-center px-2 rounded-full font-bold gap-2 cursor-pointer shadow-lg"
                        >
                            <Image
                                src="\images\chat\send-svgrepo-com (1).svg"
                                alt="Send"
                                height={20}
                                width={20}
                                className="shadow-lg"
                            />
                        </button>
                    </form>
                </>
            ) : (
                <div className="flex flex-col justify-center gap-4 items-center h-screen">
                    <div
                        className="absolute top-8 flex left-8 items-center gap-2 cursor-pointer justify-center"
                        onClick={() => router.push("/")}
                    >
                        <Image
                            src="\images\jobs\briefcase(2) 2 (1).svg"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <span className={`font-bold ml-2 text-xl text-black`}>
                            HireHub
                        </span>
                    </div>
                    <Lottie
                        animationData={animation}
                        loop
                        autoplay
                        className="w-72 h-72"
                    />
                    <h2 className="w-3/4 text-center text-base font-bold text-gray-500">
                        Start Chatting with Candidates from all over the World
                        with HireHub.
                    </h2>
                    <h2
                        className={`buttonColor text-base p-2 px-3 cursor-pointer min-md:hidden`}
                        onClick={() => showSide(true)}
                    >
                        Select a Chat
                    </h2>
                </div>
            )}
        </div>
    );
}
