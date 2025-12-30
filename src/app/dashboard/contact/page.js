"use client"
import { useGetContactQuery } from "@/store/api/contact"

let data = []

export default function Contact() {
    const message = useGetContactQuery()
    console.log(message)
    
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
                    { (message.data == null) ? <tr><td colSpan={4} className="text-center text-xl">Loading...</td></tr> : message.data.data.map((msg, index) => (
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