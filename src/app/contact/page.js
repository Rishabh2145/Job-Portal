"use client"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useFormik } from "formik"
import { useContactMutation } from "@/store/api/contact"


export default function Contact() {

    const [contact, {isLoading}] = useContactMutation()
    const contactForm = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            message: ""
        },
        onSubmit: async (values, {resetForm}) => {
            try{
                const res = await contact(values).unwrap()
                console.log("Message sent : ", res)
                alert("Message sent !")
                resetForm()
            } catch(err){
                console.log(err)
                alert("Failed to send message at this time. Please try again later.")
            }
        }
    })


    return (
        <main className="w-full flex h-full bg-white flex-col text-black">
            <div className="flex w-full h-84 flex-col items-center bg-black justify-between pb-30">
                <Header theme="dark" page="contact" />
                <h1 className="font-bold text-5xl text-white">Contact Us</h1>
            </div>
            <div className="grid grid-cols-2 flex w-full h-full flex-col items-center my-5 justify-center p-10 max-md:grid-cols-1 max-md:px-0 max-md:gap-10">
                <div className="flex flex-col gap-6 px-6 max-md:mb-10 max-md:items-center">
                    <h1 className="text-5xl font-bold max-md:text-center max-md:text-2xl">You Will Grow, You Will Succeed. We Promise That</h1>
                    <p className="max-md:text-center max-md:truncate w-9/10">Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in lectus tincidunt tincidunt ultrices. Diam convallis morbi pellentesque adipiscing </p>
                    <div className="grid grid-cols-2 gap-10 mt-10 max-md:grid-cols-1">
                        <div className="flex flex-col gap-2">
                            <Image src="/images/contact/call_24dp_309689_FILL0_wght400_GRAD0_opsz24.svg" alt="Address Icon" width={40} height={40} />
                            <span className="font-bold text-xl">Call for inquiry</span>
                            <a href="tel:1234567890" >+257 388-6895</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Image src="/images/contact/mail_24dp_309689_FILL0_wght400_GRAD0_opsz24.svg" alt="Email Icon" width={40} height={40} />
                            <span className="font-bold text-xl">Send us email</span>
                            <a href="mailto:example@example.com">kramulous@sbcglobal.net</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Image src="/images/contact/clock.svg" alt="Work" width={40} height={40} />
                            <span className="font-bold text-xl">Work Hours</span>
                            <p >Mon-Fri: 10:00 AM - 10:00 PM</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Image src="/images/contact/apartment_24dp_309689_FILL0_wght400_GRAD0_opsz24.svg" alt="Address" width={40} height={40} />
                            <span className="font-bold text-xl">Address</span>
                            <p >123 Main Street, City, Country</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#309689]/5 mx-10 p-4 rounded-2xl ">
                    <form onSubmit={contactForm.handleSubmit} className="flex flex-col items-between">
                        <div className="flex flex-col items-center h-32 justify-center gap-2">
                            <h2 className="text-2xl font-bold">Contact info</h2>
                            <p className="text-black/70">Nibh dis faucibus proin lacus tristique</p>
                        </div>
                        <div className="flex flex-col">
                            <div className="grid grid-cols-2">
                                <label htmlFor="firstName" className="px-2 mx-2 font-bold text-sm">First Name</label>
                                <label htmlFor="lastName" className="px-2 mx-2 font-bold text-sm">Last Name</label>
                            </div>
                            <div className="grid grid-cols-2">
                                <input type="text" id="firstName" name="firstName" value={contactForm.values.firstName} onChange={contactForm.handleChange} placeholder="Your Name" className="text-sm p-2 m-2 rounded-lg bg-white" />
                                <input type="text" id="lastName" name="lastName" value={contactForm.values.lastName} onChange={contactForm.handleChange} placeholder="Your Last Name" className="text-sm p-2 m-2 rounded-lg bg-white" />
                            </div>
                            <label htmlFor="email" className="px-2 mx-2 font-bold text-sm">Email Address</label>
                            <input type="email" id="email" name="email" value={contactForm.values.email} onChange={contactForm.handleChange} placeholder="Your Email Address" className="text-sm p-2 m-2 rounded-lg bg-white" />
                            <label htmlFor="msg" className="px-2 mx-2 font-bold text-sm">Message</label>
                            <textarea type="text" id="msg" name="message" value={contactForm.values.message} onChange={contactForm.handleChange} placeholder="Your Message ..." className="text-sm p-2 m-2 rounded-lg bg-white" />
                            <input type="submit" value="Send Message" className="text-sm bg-[#309689] text-white p-2 m-2 rounded-lg cursor-pointer hover:bg-[#2a8a7d] w-1/2 transition-all duration-300"/>
                        </div>
                    </form>

                </div>
            </div>
            <div className="h-1/6 flex justify-around items-center px-20 max-md:flex max-md:whitespace-nowrap max-md:overflow-auto max-md:justify-start max-md:px-6 max-md:gap-12">
                <Image src="/images/contact/logos.svg" alt="slack" width={150} height={200} className="h-full" />
                <Image src="/images/contact/logos (1).svg" alt="slack" width={150} height={200} className="h-full" />
                <Image src="/images/contact/logos (2).svg" alt="slack" width={150} height={200} className="h-full" />
                <Image src="/images/contact/logos (3).svg" alt="slack" width={150} height={200} className="h-full" />
            </div>
            <div className="text-white mt-4">
                <Footer />

            </div>
        </main>
    )
}