"use client"
import { Dashboard } from "@/components/Header";
import SideBar from "@/components/Sidebar";
import "../globals.css";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { handleError } from "../utils";



export default function RootLayout({ children }) {
  const router = useRouter()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      handleError("Please Login first!")
      setTimeout(() => router.replace('/login'), 1000)
    }
    else {
      setToken(storedToken)
    }
  }, [router])

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
