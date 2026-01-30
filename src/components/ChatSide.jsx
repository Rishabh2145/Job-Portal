"use client";
import Image from "next/image";
import { useUserQuery, useGetUsersQuery } from "@/store/api/user";
import Conversation from "./Conversation";
import { useSocket } from "@/context/socketContext";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useRouter, useSearchParams } from "next/navigation";
import { useChatContext } from "@/context/chatContext";
import moment from "moment";

export default function ChatSide() {
    const { side, showSide } = useChatContext();
    const router = useRouter();
    const socket = useSocket();
    const user = useUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    })?.data?.user;
    const usersAvailable =
        useGetUsersQuery(undefined, {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        })?.data?.users || [];
    const [userData, setUserData] = useState([]);

    const searchParams = useSearchParams();
    console.log(usersAvailable);
    useEffect(() => {
        socket.on("users", (data) => {
            setUserData(data);
        });
        return () => {
            socket.off("users");
        };
    }, []);

    return (
        <div
            className={`bg-[#309689]/2 h-screen flex-1 flex flex-col justify-between p-3 overflow-y-auto max-md:${side ? "block" : "hidden"} max-md:absolute max-md:z-10 max-md:w-full max-md:bg-white`}
        >
            <div className="flex flex-col gap-4 py-2">
                <div className="flex justify-between">
                    <h1 className=" text-3xl font-bold px-2">Chats</h1>
                    <h1
                        className={`text-3xl font-bold px-2 min-md:hidden cursor-pointer`}
                        onClick={() => showSide(false)}
                    >
                        &times;
                    </h1>
                </div>
                <div className="flex bg-white p-2 px-3 shadow-sm rounded gap-2 text-sm mx-2">
                    <Image
                        src="/images/chat/search-svgrepo-com.svg"
                        alt="search"
                        height={15}
                        width={15}
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="h-8 w-full focus:outline-none font-bold"
                    />
                </div>
                <div className="flex flex-col gap-2 p-2 overflow-y-auto">
                    {userData &&
                        user &&
                        userData.map((item, index) => (
                            <Conversation
                                key={index}
                                profile={item?.User[0]?.avatar}
                                name={item?.User[0]?.fullName}
                                role={item?.User[0]?.role}
                                id={item?.User[0]?._id}
                                unread={item?.unreadCount}
                                time={item?.Chats[0]?.createdAt || ""}
                                msg={
                                    item?.Chats[0]?.message || "Start Chatting!"
                                }
                                seen={item?.Chats[0]?.seenBy.length || 0}
                                participants={item?.participants || []}
                                lastSeen={item?.lastseen}
                                sender={item?.Chats[0]?.sender}
                            />
                        ))}
                </div>
            </div>
            {user && (
                <div className="flex sticky bottom-0 bg-white items-center shadow gap-4 p-3 rounded-lg shadow cursor-pointer justify-between">
                    <div
                        className="flex items-center gap-2"
                        onClick={() => router.push("/dashboard/profile")}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API}/${user.avatar}`}
                            alt="Avatar"
                            height={50}
                            width={50}
                            unoptimized
                            className="rounded-full"
                        />
                        <div className="flex flex-col">
                            <p className="font-bold">{user.fullName}</p>
                            <p className="text-xs">{user.role}</p>
                        </div>
                    </div>

                    <Popup
                        trigger={
                            <button className="buttonColor text-4xl p-1 px-3">
                                &#43;
                            </button>
                        }
                        position="right center"
                        modal
                        nested
                        className="text-black rounded-lg"
                    >
                        {(close) => (
                            <div className="text-black bg-white shadow-xl rounded-xl min-w-100">
                                <div className="flex justify-between p-4 items-center">
                                    <h1 className="text-xl font-bold">
                                        All Chats
                                    </h1>
                                    <button
                                        className="text-black text-2xl"
                                        onClick={close}
                                    >
                                        &times;
                                    </button>
                                </div>

                                {usersAvailable &&
                                    usersAvailable
                                        .filter((u) => u._id !== user._id)
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className="w-full h-fit flex flex-col bg-white gap-4 p-4 rounded-lg shadow cursor-pointer hover:scale-102 transition-all"
                                                onClick={() => {
                                                    const params =
                                                        new URLSearchParams(
                                                            searchParams.toString(),
                                                        );
                                                    params.set("id", item._id);
                                                    showSide(false);
                                                    router.push(
                                                        `/chat?${params.toString()}`,
                                                        { scroll: false },
                                                    );
                                                    close();
                                                }}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-4 relative">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_API}/${item.avatar}`}
                                                            alt="Profile"
                                                            height={60}
                                                            width={60}
                                                            unoptimized
                                                            className="rounded-full p-1"
                                                        />

                                                        <div className="flex flex-col item-center justify-center">
                                                            <p className="text-sm font-bold">
                                                                {item.fullName}
                                                            </p>
                                                            <p className="text-xs ">
                                                                {item.role}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        )}
                    </Popup>
                </div>
            )}
        </div>
    );
}
