"use client"
import axios from "axios"
import { useState, useEffect } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function Contact() {
    const [message, setMessage] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${API_URL}/message`, { method: 'GET' })
                setMessage(res.data.data || [])
            } catch (err) {
                console.log(err)
                setError("Failed to load messages")
            } finally {
                setLoading(false)
            }
        }
        fetchMessages()
    }, [])

    const hello = async (id) =>
    {
        alert("Message Deleted")
        console.log(id)
        return
    }


    if (loading) {
        return (
            <main className="bg-white shadow-md m-4 rounded-xl p-8 flex flex-col gap-6">
                <p>Loading messages...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="bg-white shadow-md m-4 rounded-xl p-8 flex flex-col gap-6">
                <p className="text-red-500">{error}</p>
            </main>
        )
    }

    return (
        <main className="bg-white shadow-md m-4 rounded-xl p-8 flex flex-col gap-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Contacts</h1>
                <a href="/dashboard/contact/add" className="bg-[#309689] text-white p-2  rounded-xl"> + Add a message</a>
            </div>
            <p>Messages Recieved:</p>
            <table className="w-full rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 text-left">First Name</th>
                        <th className=" p-2 text-left">Last Name</th>
                        <th className=" p-2 text-left">Email</th>
                        <th className="p-2 text-left">Message</th>
                        <th className=" p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {message.map((msg, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className=" p-2">{msg.firstName}</td>
                            <td className=" p-2">{msg.lastName}</td>
                            <td className=" p-2">{msg.email}</td>
                            <td className=" p-2">{msg.message}</td>
                            <td className=" p-2">
                                <input type="button" value="Delete" className="text-sm bg-red-500 text-white p-1 m-1 rounded-lg cursor-pointer hover:bg-red-600 w-fit p-3 transition-all duration-300" onClick={() => hello(msg._id)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </main>
    )
}