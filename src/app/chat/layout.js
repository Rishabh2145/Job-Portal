"use client";
import ChatSide from "@/components/ChatSide";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { ChatProvider } from "@/context/chatContext";

export default function RootLayout({ children }) {
    return (
        <main>
            <ChatProvider>
                <main className="flex w-screen text-black bg-white ">
                    <Suspense
                        fallback={
                            <div className="h-screen flex items-center justify-center">
                                Loading...
                            </div>
                        }
                    >
                        <ChatSide className="flex-1"/>
                        <div className="flex-3 h-screen overflow-y-auto bg-[#309689]/5 ">
                            {children}
                        </div>
                    </Suspense>
                </main>
                <ToastContainer />
            </ChatProvider>
        </main>
    );
}
