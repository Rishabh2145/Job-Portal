"use client"
import { Dashboard } from "@/components/Header";
import SideBar from "@/components/Sidebar";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { DashBoardProvider } from "@/context/dashboardContext";


export default function RootLayout({ children }) {
  return (
    <main>
      <DashBoardProvider>
      <main className="flex w-screen text-black bg-white overflow-hidden">
        <SideBar className="flex-1"/>
        <div className="flex-5 h-screen overflow-y-auto bg-[#309689]/5 ">
          <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <Dashboard />
          </Suspense>
          {children}
        </div>
      </main>
      <ToastContainer />
      </DashBoardProvider>
    </main>
  );
}
