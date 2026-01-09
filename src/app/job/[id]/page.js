"use client"
import { useJobDetailMutation } from "@/store/api/job"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import Header from "@/components/Header"

export default function Details() {
    const [job, { isLoading }] = useJobDetailMutation()
    const path = usePathname()
    const id = path.split('/').filter(Boolean).pop()
    // const res = job({id}).unwrap()

    // console.log(res)
    return (
        <main>
            <div className="flex w-full h-84 flex-col items-center bg-black justify-between pb-30">
                <Header theme="dark" page="job" />
                <h1 className="font-bold text-5xl text-white">Jobs Details</h1>
            </div>
        </main>
    )
}