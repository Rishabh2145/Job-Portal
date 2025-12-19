"use client"

import Image from "next/image"
// import { details } from "../edit/page"
import { useRouter } from "next/navigation"

export default function Profile() {
    const router = useRouter()
    // const details = router.query
    // console.log(details)
    return (
        <main className="grid grid-cols-2 p-5 m-5 bg-white rounded-xl shadow-sm">
            <div className="flex flex-col w-full p-4 justify-around">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <table className="h-3/4">
                    <tbody className="p-4 w-full">
                        <tr className="">
                            <th>Name:</th>
                            <td>Sample Name</td>
                            <th>Contact:</th>
                            <td>Sample Contact</td>
                        </tr>
                        <tr>
                            <th>Email Address:</th>
                            <td>Sample Email</td>
                            <th>Mobile:</th>
                            <td>Sample mobile</td>
                        </tr>
                        <tr>
                            <th>College:</th>
                            <td>Institute</td>
                            <th>Grade:</th>
                            <td>A+</td>
                        </tr>
                        <tr>
                            <th>School:</th>
                            <td>School</td>
                            <th>Grade:</th>
                            <td>A++</td>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>Rishabh Kumar</td>
                            <th>Contact:</th>
                            <td>123456789</td>
                        </tr>
                    </tbody>
                </table>
                <div className="w-full flex justify-center items-center">
                    <a href="/dashboard/edit" className="h-12 flex border w-1/3 justify-center items-center rounded-xl border-gray-400 text-gray-700">Edit Profile</a>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 p-4">
                <Image
                    src='/images/review/Avatar.svg'
                    height={350}
                    width={350}
                    alt="Profile"
                />
                <button className="h-12 flex border w-1/3 justify-center items-center rounded-xl border-gray-400 text-gray-700 cursor-pointer">Edit Photo</button>
            </div>
        </main>
    )
}