'use client'
import Image from "next/image"
import { useState } from "react"
export let details = {}

export default function Edit() {
    return (
        <main className="bg-white p-12 flex flex-col gap-8 m-4 rounded-xl">
            <h1 className="text-3xl font-bold">Edit My Profile</h1>
            <form action='/dashboard/profile' method="post" className="grid grid-cols-2 flex justify-center items-center gap-6 max-md:grid-cols-1">
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="name" className="flex items-center justify-end">Enter Full Name:</label>
                    <input id="name" type="text" className="border rounded-md h-10"/>
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="contact" className="flex items-center justify-end">Enter Contact Number:</label>
                    <input id="contact" type="number" className="border rounded-md h-10"/>
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="email" className="flex items-center justify-end">Enter Email Address:</label>
                    <input id="email" type="email" className="border rounded-md h-10"/>
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="mobile" className="flex items-center justify-end">Enter Mobile Number:</label>
                    <input id="mobile" type="number" className="border rounded-md h-10"/>
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="institute" className="flex items-center justify-end">Enter Institute Name:</label>
                    <input id="institute" type="text" className="border rounded-md h-10"/>
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="cGrade" className="flex items-center justify-end">Enter Grade (CGPA/Percent):</label>
                    <input id="cGrade" type="number" className="border rounded-md h-10"/>
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="school" className="flex items-center justify-end">Enter School Name:</label>
                    <input id="school" type="text" className="border rounded-md h-10"/>
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="sGrade" className="flex items-center justify-end">Enter Grade (CGPA/Percent):</label>
                    <input id="sGrade" type="number" className="border rounded-md h-10"/>
                </div>
                <div className="flex w-full  gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="address" className="flex items-center justify-end">Enter Address:</label>
                    <textarea id="address" type="text" className="border rounded-md h-10"/>
                </div>
                <br/>
                <div className="flex gap-6 col-span-2 items-center justify-center">
                    <a href="/dashboard" className="border-red-500 border px-4 rounded-lg text-red-500 p-2 hover:bg-red-500 cursor-pointer hover:text-white transition-all">Discard</a>
                    <input type="submit" value="Save Details" className="border-green-500 border px-4 rounded-lg text-green-500 p-2 hover:bg-green-500 cursor-pointer hover:text-white transition-all"/>
                </div>
            </form>

        </main>
    )
}
