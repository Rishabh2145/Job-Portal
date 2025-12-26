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

    // const deleteMsg = useFormik({
    //     initialValues: {
    //         id: ""
    //     }
    //     ,
    //     onSubmit: async (e) => {
    //         e.preventDefault()
    //         console.log(deleteMsg.values.id)
    //         await axios.post("http://localhost:8000/contact", { id: deleteMsg.values.id }, { method: 'POST' }).then(() => {
    //             alert("Message deleted successfully")
    //         }).catch((err) => {
    //             alert("Message not deleted: ", err)
    //         })
    //     }
    // })


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
                        {/* <th className=" p-2 text-left">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {message.map((msg, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className=" p-2">{msg.firstName}</td>
                            <td className=" p-2">{msg.lastName}</td>
                            <td className=" p-2">{msg.email}</td>
                            <td className=" p-2">{msg.message}</td>
                            {/* <td className=" p-2"><form onSubmit={deleteMsg.handleSubmit} method="POST">
                                <input type="submit" value="Delete" className="text-sm bg-red-500 text-white p-2 m-2 rounded-lg cursor-pointer hover:bg-red-600 w-fit p-3 transition-all duration-300" onClick={deleteMsg.values.id = msg._id} />
                            </form></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

        </main>
    )
}