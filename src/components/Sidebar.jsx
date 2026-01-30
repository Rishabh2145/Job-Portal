"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserQuery } from "@/store/api/user";
import { useDashBoardContext } from "@/context/dashboardContext";

const menu = [
    { name: 'Dashboard', link: '' },
    { name: 'My Profile', link: 'profile' },
    { name: 'Jobs Applied', link: 'job' },
    { name: 'Contact', link: 'contact' },
    { name: 'Logout', link: '../' },
]
export default function SideBar() {

    const user = useUserQuery(
        undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    const {side, showSide} = useDashBoardContext()
    const router = useRouter()
    return (
        <div id="sidebar" className={`flex-1 h-screen overflow-y-auto gap-5 flex flex-col p-5 px-7 py-8 shadow-lg max-md:${side ? "block" : "hidden"} max-md:absolute max-md:z-10 max-md:w-full max-md:bg-white`}>
            <div className="flex items-center justify-between">
                <a href="/" className="flex items-center gap-2 cursor-pointer">
                    <Image
                        src='/images/jobs/briefcase(2) 2 (1).svg'
                        alt="Logo"
                        width={30}
                        height={30}
                    />
                    <span className="font-bold ml-2 text-lg">Job Portal</span>
                </a>
                <p className="text-2xl font-bold" onClick={() => showSide(false)}>&times;</p>
            </div>
            <div className="flex flex-col gap-2 mt-5">
                <p className="text-xs text-gray-500">Overview</p>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer" onClick={() => {router.replace('/dashboard')
                    showSide(false)
                }}>
                    Dashboard
                </button>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer" onClick={() => {router.replace('/dashboard/profile')
                    showSide(false)
                }}>
                    My Profile
                </button>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer" onClick={() => {router.replace('/chat')
                    showSide(false)
                }}>
                    Chats
                </button>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer" onClick={() => {router.replace('/dashboard/job')
                    showSide(false)
                }}>
                    Jobs Applied
                </button>
                <button className={`w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer ${user?.data?.user?.role !== 'Candidate' ? 'block' : 'hidden'}`} onClick={() => {router.replace('/dashboard/applicant')
                    showSide(false)
                }}>
                    Applicants
                </button>
                <button className={`w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer ${user?.data?.user?.role !== 'Candidate' ? 'block' : 'hidden'}`} onClick={() => {router.replace('/dashboard/addjob')
                    showSide(false)
                }}>
                    Add a New Job
                </button>
                <button className={`w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer ${user?.data?.user?.role === 'Admin' ? `block` : 'hidden'}`} onClick={() => {router.replace('/dashboard/contact')
                    showSide(false)
                }}>
                    Contact
                </button>
                <button className={`w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer ${user?.data?.user?.role !== 'Candidate' ? `block` : 'hidden'}`} onClick={() => {router.replace('/dashboard/query')
                    showSide(false)
                }}>
                    Job Query
                </button>
                <button className={`w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer`} onClick={() => {router.replace('/dashboard/review')
                    showSide(false)
                }}>
                    Feedback
                </button>
                <button className={`w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer ${user?.data?.user?.role === 'Admin' ? `block` : 'hidden'}`} onClick={() => {router.replace('/dashboard/editabout')
                    showSide(false)
                }}>
                    Edit About
                </button>
                <button className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all cursor-pointer" onClick={
                    () => {
                        router.replace('/logout')
                        showSide(false)
                    }
                }>
                    Logout
                </button>
            </div>
        </div>
    )
}