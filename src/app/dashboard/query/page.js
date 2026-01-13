"use client"
import { handleError, handleSuccess } from "@/app/utils"
import { useDelContactMutation, useJobMessageQuery } from "@/store/api/contact"
import { useUserQuery } from "@/store/api/user"
import { useEffect } from "react"


export default function Contact() {
    const message = useJobMessageQuery()
    const user = useUserQuery()
    const [deleteMessage, { isLoading, isSuccess}] = useDelContactMutation(
        undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    const data = message?.data?.data

    if (!user?.data) {
        return (
            <div>Loading...</div>
        )
    }

    if (user?.data?.user?.user?.role === 'Candidate') {
        return (
            <div>Access Denied!</div>
        )
    }
    const handleDelete = async (id) => {
        try {
            const res = await deleteMessage({ id }).unwrap()
            handleSuccess(res.message)
        } catch (err) {
            handleError(err?.data?.message)
            console.log(err)
        }
    }

    return (
        <main className="bg-white shadow-md m-4 rounded-xl p-8 flex flex-col gap-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Queries for Job</h1>
            </div>
            <p>Messages Recieved:</p>
            <table className="w-full rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 text-left">Job Title</th>
                        <th className="p-2 text-left">Company Name</th>
                        <th className="p-2 text-left">First Name</th>
                        <th className=" p-2 text-left">Last Name</th>
                        <th className=" p-2 text-left">Email</th>
                        <th className="p-2 text-left">Message</th>
                        <th className=" p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(data == undefined) ? <tr><td colSpan={4} className="text-center text-xl">Loading...</td></tr> : data.map((msg, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className=" p-2">{msg.Message[0].title}</td>
                            <td className=" p-2">{msg.Message[0].company}</td>
                            <td className=" p-2">{msg.firstName}</td>
                            <td className=" p-2">{msg.lastName}</td>
                            <td className=" p-2">{msg.email}</td>
                            <td className=" p-2">{msg.message}</td>
                            <td className=" p-2">
                                <input type="button" value={isLoading ? `Loading...` : 'Delete'} disabled={isLoading || isSuccess} className="text-sm bg-red-500 text-white p-1 m-1 rounded-lg cursor-pointer hover:bg-red-600 w-fit p-3 transition-all duration-300" onClick={() => handleDelete(msg._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </main>
    )
}