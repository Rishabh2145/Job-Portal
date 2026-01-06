"use client"
import { Dashboard } from "@/components/Header";
import SideBar from "@/components/Sidebar";
import "../globals.css";
import { ToastContainer } from "react-toastify";



export default function RootLayout({ children }) {
  return (
    <main>
      <main className="grid grid-cols-5 w-screen text-black bg-white ">
        <SideBar />
        <div className="col-span-4 h-screen overflow-y-auto bg-[#309689]/5 ">
          <Dashboard />
          {children}
        </div>
      </main>
      <ToastContainer />
    </main>
  );
}
