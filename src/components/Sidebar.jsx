"use client"

import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const menu = [
    { name: 'Dashboard', link: '' },
    { name: 'My Profile', link: 'profile' },
    { name: 'Jobs Applied', link: 'job' },
    { name: 'Contact', link: 'contact' },
    { name: 'Logout', link: '../' },
]
export default function SideBar() {
    const router = useRouter()
    return (
        <div id="sidebar" className="h-screen overflow-y-auto gap-5 flex flex-col p-5 px-7 py-8 shadow-lg">
            <div>
                <a href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <Image
                        src='/images/jobs/briefcase(2) 2 (1).svg'
                        alt="Logo"
                        width={30}
                        height={30}
                    />
                    <span className="font-bold ml-2 text-lg">Job Portal</span>
                </a>
            </div>
            <div className="flex flex-col gap-2 mt-5">
                <p className="text-xs text-gray-500">Overview</p>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all" onClick={() => router.push('/dashboard')}>
                    Dashboard
                </button>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all" onClick={() => router.push('/dashboard/profile')}>
                    My Profile
                </button>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all" onClick={() => router.push('/dashboard/job')}>
                    Jobs Applied
                </button>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all" onClick={() => router.push('/dashboard/contact')}>
                    Contact
                </button>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all" onClick={
                    () => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        router.push('/login')
                    }
                }>
                    Logout
                </button>
            </div>
        </div>
    )
}