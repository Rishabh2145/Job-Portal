"use client"

import { useFormik } from "formik"
import { useContactMutation } from "@/store/api/contact"

export default function Contact() {

    const [contact, { isLoading }] = useContactMutation()
    const contactForm = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            message: ""
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await contact(values).unwrap()
                console.log("Message sent : ", res)
                alert("Message sent !")
                resetForm()
            } catch (err) {
                console.log(err)
                alert("Failed to send message at this time. Please try again later.")
            }
        }
    })

    return (
        <main>
            <form onSubmit={contactForm.handleSubmit} className="flex flex-col items-between m-4 p-4 my-0 bg-white shadow-md rounded-xl">
                <div className="flex flex-col h-24 justify-center gap-2">
                    <h2 className="text-3xl font-bold">Sends a Message</h2>
                    <p className="text-black/70 text-sm">Nibh dis faucibus proin lacus tristique</p>
                </div>
                <div className="flex flex-col ">
                    <div className="grid grid-cols-2">
                        <label htmlFor="firstName" className="px-2 mx-2 font-bold text-sm">First Name</label>
                        <label htmlFor="lastName" className="px-2 mx-2 font-bold text-sm">Last Name</label>
                    </div>
                    <div className="grid grid-cols-2">
                        <input type="text" id="firstName" name="firstName" value={contactForm.values.firstName} onChange={contactForm.handleChange} placeholder="Your Name" className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                        <input type="text" id="lastName" name="lastName" value={contactForm.values.lastName} onChange={contactForm.handleChange} placeholder="Your Last Name" className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                    </div>
                    <label htmlFor="email" className="px-2 mx-2 font-bold text-sm">Email Address</label>
                    <input type="email" id="email" name="email" value={contactForm.values.email} onChange={contactForm.handleChange} placeholder="Your Email Address" className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                    <label htmlFor="msg" className="px-2 mx-2 font-bold text-sm">Message</label>
                    <textarea type="text" id="message" name="message" value={contactForm.values.message} onChange={contactForm.handleChange} placeholder="Your Message ..." className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                    <input type="submit" value="Send Message" className="text-sm bg-[#309689] text-white p-2 m-2 rounded-lg cursor-pointer hover:bg-[#2a8a7d] w-fit p-3 transition-all duration-300" />
                </div>
            </form>
        </main>
    )
}