"use client"
import axios from "axios"


let message = [
]

export default async function Contact() {
    await axios.get("http://localhost:8000/message", { method: 'GET' }).then((res) => {
        message = res.data.data
        console.log(res.data.data)
    }).catch((err) => {
        console.log(err)
    })


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
                    </tr>
                </thead>
                <tbody>
                    {message.map((msg, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className=" p-2">{msg.firstName}</td>
                            <td className=" p-2">{msg.lastName}</td>
                            <td className=" p-2">{msg.email}</td>
                            <td className=" p-2">{msg.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </main>
    )
}