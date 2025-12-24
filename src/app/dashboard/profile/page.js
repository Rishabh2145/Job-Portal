"use client"

import Image from "next/image"
// import { details } from "../edit/page"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Profile() {
    const router = useRouter()
    const [edit, setEdit] = useState(true);
    const toggleEdit = () => {
        setEdit(!edit);
    }
    
    return (
        <main className="grid grid-cols-2 p-5 m-5 bg-white rounded-xl shadow-sm max-md:grid-cols-1">
            <div className="flex flex-col w-full p-4 justify-around">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <table className="h-3/4 max-md:mt-4">
                    <tbody className="p-4 w-full">
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>Name:</th>
                            <td>Sample Name</td>
                            <th>Contact:</th>
                            <td>Sample Contact</td>
                        </tr>
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>Email Address:</th>
                            <td>Sample Email</td>
                            <th>Mobile:</th>
                            <td>Sample mobile</td>
                        </tr>
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>College:</th>
                            <td>Institute</td>
                            <th>Grade:</th>
                            <td>A+</td>
                        </tr>
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>School:</th>
                            <td>School</td>
                            <th>Grade:</th>
                            <td>A++</td>
                        </tr>
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>Name:</th>
                            <td>Rishabh Kumar</td>
                            <th>Contact:</th>
                            <td>123456789</td>
                        </tr>
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>Address:</th>
                            <td colSpan={3}>Sample Address, City, State, Country - 123456</td>
                        </tr>
                    </tbody>
                </table>
                <div className="w-full flex justify-center items-center">
                    <a href="/dashboard/edit" className="h-12 flex border w-1/3 justify-center items-center rounded-xl border-gray-400 text-gray-700 max-md:w-2/3 max-md:mt-4">Edit Profile</a>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 p-4">
                <Image
                    src='/images/review/Avatar.svg'
                    height={350}
                    width={350}
                    alt="Profile"
                />
                <input type="file" accept="image/*" className={`border rounded-lg px-4 p-1 ${edit ? 'hidden' : 'block'} max-md:w-2/3`} id="photoUpload" />
                <button className="h-12 flex border w-1/3 justify-center items-center rounded-xl border-gray-400 text-gray-700 cursor-pointer max-md:w-2/3" onClick={toggleEdit}>Edit Photo</button>
            </div>
        </main>
    )
}