"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useChatContext } from "@/context/chatContext";
import moment from "moment";
export default function Conversation(props) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const { side, showSide } = useChatContext();
    
    return (
        <div
            className="w-full h-fit flex flex-col bg-white gap-4 p-4 rounded-lg shadow cursor-pointer hover:scale-102 transition-all"
            onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("id", props.id);
                showSide(false);
                router.push(`/chat?${params.toString()}`, { scroll: false });
            }}
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-4 relative">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API}/${props.profile}`}
                        alt="Profile"
                        height={60}
                        width={60}
                        unoptimized
                        className="rounded-full p-1"
                    />
                    <span className={`h-3 w-3 rounded-full bottom-0 left-11 absolute bg shadow shadow-cyan-500/90 ${props.lastSeen.filter((u) => u.user === props.id)[0].seen === null ? 'block' : 'hidden'}`}></span>
                    <div className="flex flex-col item-center justify-center">
                        <p className="text-sm font-bold">{props.name}</p>
                        <p className="text-xs ">{props.role}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className={`${props.unread !== 0 ? 'faq font-bold' : ''}text-xs`}>{props.time === "" ? "" : moment(props.time).fromNow()}</p>
                    <span className={`${props.unread === 0 ? 'hidden' : 'block'} text-sm bg text-white p-1 px-2 rounded-full shadow-xl max-w-fit self-end` }>{props.unread}</span>
                </div>
            </div>
            <div className="flex gap-2 px-2">
                <p className={`text-sm ${(props.participants.length === props.seen) ? 'text-blue-500' : 'text-gray-500'} font-bold ${(props.id !== props.sender) ? 'block' : 'hidden'}`}>&#10003;</p>
                <p className={`text-sm text-gray-500 truncate ${props.unread === 0 ? '' : 'faq font-bold'}`}>{props.msg}</p>
            </div>
        </div>
    );
}
