"use client"
import { useGetBookmarkQuery, useJobDetailMutation, useBookmarkMutation } from "@/store/api/job"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import Header from "@/components/Header"
import Image from "next/image"
import Footer from "@/components/Footer"
import Job from "@/components/Job"
import { useGetJobQuery } from "@/store/api/job"
import { useContactMutation } from "@/store/api/contact"
import { useFormik } from "formik"
import Popup from "reactjs-popup"
import { contactValidation } from "@/app/utils"
import { useUserQuery } from "@/store/api/user"
import { handleSuccess, handleError } from "@/app/utils"
import 'reactjs-popup/dist/index.css';

export default function Details() {
    const [job, { isLoading, isSuccess, data }] = useJobDetailMutation()
    const [marks,] = useBookmarkMutation();
    const bookmark = useGetBookmarkQuery()
    const user = useUserQuery()
    const jobData = useGetJobQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    const [contact,] = useContactMutation()
    const contactForm = useFormik({
        initialValues: {
            firstName: user?.data?.user.user.fullName || "",
            lastName: "",
            email: user?.data?.user.user.email || '',
            message: "",
            messageTo: data?.jobs?._id
        },
        enableReinitialize: true,
        validationSchema: contactValidation,
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await contact(values).unwrap()
                handleSuccess(res.message)
                resetForm()
            } catch (err) {
                console.log(err)
                handleError("Failed to send message at this time. Please try again later.")
            }
        }
    })

    const handleBookmark = async (jobId) => {
        try {
            const res = await marks({ jobId }).unwrap()
            handleSuccess(res.message)
        } catch (err) {
            handleError(err?.data.message)
            console.log(err)
        }
    }

    let Jdata = []
    Jdata = jobData?.data?.jobs || []
    const jobs = [...Jdata].reverse();
    const path = usePathname()
    const id = path.split('/').filter(Boolean).pop()
    const isBookmarked = bookmark?.data?.bookmarks?.bookmarks.find((u) => u._id === data?.jobs?._id) ? true : false;

    useEffect(() => {
        job({ id }).unwrap()
    }, [])

    const now = new Date()
    const created = new Date(data?.jobs.createdAt)
    let time = Math.floor((now - created) / (1000 * 60))
    let hour = false

    if (time > 60) {
        time = Math.floor(time / 60)
        hour = true
    }
    return (
        <main>
            <div className="flex w-full h-84 flex-col items-center bg-black justify-between pb-30">
                <Header theme="dark" page="job" />
                <h1 className="font-bold text-5xl text-white">Jobs Details</h1>
            </div>
            <div className="bg-white flex flex-col items-center">
                <div className="flex flex-col justify-between  gap-6 p-6 rounded-xl w-full px-10 bg-white">
                    <div className="flex w-full justify-between">
                        <p className="bg-[#309689]/20 text-[#309689] px-2 py-1 rounded-lg text-sm">
                            {time} {hour ? 'hr' : 'min'} ago
                        </p>
                        <Image src={isBookmarked ? '/images/jobs/icons8-bookmark-90.svg' : "/images/jobs/icon.svg"} alt="Job Logo" width={20} height={20} onClick={() => handleBookmark(data?.jobs?._id)} />
                    </div>
                    <div className="flex gap-6 max-md:flex-col">
                        <Image src={`${process.env.NEXT_PUBLIC_API}/${data?.jobs.companyImage}`} alt="Job Logo" width={100} height={100} unoptimized />
                        <div>
                            <p className="font-bold text-xl text-black">{data?.jobs.title}</p>
                            <p className="text-gray-600">{data?.jobs.company}</p>
                        </div>
                    </div>
                    <div className="flex w-full justify-between max-md:flex-col gap-2">
                        <div className="flex gap-4 justify-around max-md:flex-col max-md:w-1/1 max-md:items-start">
                            <div className="flex gap-2 items-center justify-center">
                                <Image src="/images/jobs/briefcase(2) 2 (1).svg" alt="Category" width={20} height={20} />
                                <span className="text-gray-700">{data?.jobs.category}</span>
                            </div>
                            <div className="flex gap-2  items-center justify-center">
                                <Image src="/images/jobs/clock.svg" alt="Time" width={20} height={20} />
                                <span className="text-gray-700">{data?.jobs.jobType}</span>
                            </div>
                            <div className="flex gap-2 items-center justify-center">
                                <Image src="/images/jobs/g135.svg" alt="Salary" width={20} height={20} />
                                <span className="text-gray-700">{data?.jobs.salary}</span>
                            </div>
                            <div className="flex gap-2 items-center justify-center">
                                <Image src="/images/jobs/map-pin.svg" alt="Location Icon" width={20} height={20} />
                                <span className="text-gray-700">{data?.jobs.location}</span>
                            </div>
                        </div>
                        <Popup trigger={<button className="text-black buttonColor p-2 w-50 cursor-pointer max-md:self-center max-md:w-8/9 max-md:mt-4">Apply Job</button>}
                            position='right center'
                            modal nested className="text-black">
                            {close => (
                                <div className="modal text-black">
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="header"> GeeksforGeeks </div>
                                    <div className="content">
                                        This is a simple popup example.
                                    </div>
                                    <div className="actions">
                                        <button className="button" onClick={() => {
                                            console.log('Button clicked');
                                            close();
                                        }}>Click here</button>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                </div>
            </div>
            <div className="bg-white text-black px-10 flex max-md:flex-col-reverse">
                <div className="flex flex-col gap-3 flex-4 mt-6">
                    <h1 className="text-xl font-bold ">
                        Job Description
                    </h1>
                    <p className="text-balance max-md:wrap-break-word">{data?.jobs.description}</p>
                    <h1 className="text-xl font-bold mt-4">
                        Key Responsibilities
                    </h1>
                    <p className="text-balance max-md:wrap-break-word">{data?.jobs.responsibility}</p>
                    <h1 className="text-xl font-bold mt-4">
                        Professional Skills
                    </h1>
                    <p className="text-balance max-md:wrap-break-word">{data?.jobs.skill}</p>
                    <h1 className="text-xl font-bold mt-4">
                        Tags
                    </h1>
                    <div className="flex gap-4 mb-10 overflow-auto">
                        <p className="bg-[#309689]/20 text-[#309689] p-2 rounded-lg text-sm h-fit">{data?.jobs.category}</p>
                        <p className="bg-[#309689]/20 text-[#309689] p-2 rounded-lg text-sm h-fit">{data?.jobs.jobType}</p>
                        <p className="bg-[#309689]/20 text-[#309689] p-2 rounded-lg text-sm h-fit">{data?.jobs.location}</p>
                        <p className="bg-[#309689]/20 text-[#309689] p-2 rounded-lg text-sm h-fit">Corporate</p>
                        <p className="bg-[#309689]/20 text-[#309689] p-2 rounded-lg text-sm h-fit">Location</p>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Related Jobs</h1>
                        <p>At eu lobortis pretium tincidunt amet lacus ut aenean aliquet</p>
                        <div className="mb-6">
                            {jobs.filter(item => item._id !== data?.jobs._id && (item.category === data?.jobs.category || item.location === data?.jobs.location || item.jobType === data?.jobs.jobType)).slice(0, 3).map((item, index) => (

                                <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} id={item._id} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className=" flex-1 ml-6 flex flex-col rounded-xl mb-10 h-fit p-4 max-md:px-0 max-md:ml-0">
                    <div className="fadeBlue gap-6 flex flex-col rounded-xl mb-10 h-fit p-4">
                        <h2 className="text-lg font-bold">Job Overview</h2>
                        <div className="flex items-center gap-4">
                            <Image src='\images\contact\account_circle_24dp_309689_FILL0_wght400_GRAD0_opsz24.svg' height={30} width={30} alt="image" />
                            <div>
                                <p className="font-bold">Job Title</p>
                                <p className="text-gray-600">{data?.jobs.title}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src='/images/jobs/clock.svg' height={30} width={30} alt="image" />
                            <div>
                                <p className="font-bold">Job Type</p>
                                <p className="text-gray-600">{data?.jobs.jobType}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src='/images/jobs/briefcase(2) 2 (1).svg' height={25} width={25} alt="image" />
                            <div>
                                <p className="font-bold">Category</p>
                                <p className="text-gray-600">{data?.jobs.category}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src='\images\jobs\home\Clip path group.svg' height={25} width={25} alt="image" />
                            <div>
                                <p className="font-bold">Degree</p>
                                <p className="text-gray-600">{data?.jobs.degree || "Bachelor"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src='\images\about\excellence(1) 2.svg' height={25} width={25} alt="image" />
                            <div>
                                <p className="font-bold">Experience</p>
                                <p className="text-gray-600">{data?.jobs.experience || '0 Years'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src='/images/jobs/g135.svg' height={25} width={25} alt="image" />
                            <div>
                                <p className="font-bold">Offered Salary</p>
                                <p className="text-gray-600">{data?.jobs.salary || 'Unpaid'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src='/images/jobs/map-pin.svg' height={25} width={25} alt="image" />
                            <div>
                                <p className="font-bold">Location</p>
                                <p className="text-gray-600">{data?.jobs.location}</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={contactForm.handleSubmit} className="flex flex-col items-between fadeBlue px-4 my-0 bg-white shadow-md rounded-xl">
                        <div className="flex flex-col h-24 justify-center gap-2">
                            <h2 className="text-xl font-bold">Sends us Message</h2>
                        </div>
                        <div className="flex flex-col ">
                            <div className={`grid ${contactForm.errors?.firstName || contactForm.errors?.lastName ? 'grid-cols-1' : 'grid-cols-1'}`}>
                                <label htmlFor="firstName" className="px-2 mx-2 font-bold text-sm">First Name</label>
                                <input type="text" id="firstName" onBlur={contactForm.handleBlur} name="firstName" value={contactForm.values.firstName} onChange={contactForm.handleChange} placeholder="Your Name" className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                                {contactForm.touched.firstName && contactForm.errors.firstName && (
                                    <p className="text-red-500 text-sm px-2 mx-2">{contactForm.errors.firstName}</p>
                                )}
                            </div>
                            <div className={`grid ${contactForm.errors?.firstName || contactForm.errors?.lastName ? 'grid-cols-1' : 'grid-cols-1'}`}>
                                <label htmlFor="lastName" className="px-2 mx-2 font-bold text-sm">Last Name</label>
                                <input type="text" id="lastName" onBlur={contactForm.handleBlur} name="lastName" value={contactForm.values.lastName} onChange={contactForm.handleChange} placeholder="Your Last Name" className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                                {contactForm.touched.lastName && contactForm.errors.lastName && (
                                    <p className="text-red-500 text-sm px-2 mx-2">{contactForm.errors.lastName}</p>
                                )}
                            </div>
                            <label htmlFor="email" className="px-2 mx-2 font-bold text-sm">Email Address</label>
                            <input type="email" id="email" onBlur={contactForm.handleBlur} name="email" value={contactForm.values.email} disabled={true} placeholder="Your Email Address" className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                            {contactForm.touched.email && contactForm.errors.email && (
                                <p className="text-red-500 text-sm px-2 mx-2">{contactForm.errors.email}</p>
                            )}
                            <label htmlFor="msg" className="px-2 mx-2 font-bold text-sm">Message</label>
                            <textarea type="text" id="message" name="message" onBlur={contactForm.handleBlur} value={contactForm.values.message} onChange={contactForm.handleChange} placeholder="Your Message ..." className="text-sm p-2 m-2 rounded-lg bg-white border border-gray-300" />
                            {contactForm.touched.message && contactForm.errors.message && (
                                <p className="text-red-500 text-sm px-2 mx-2">{contactForm.errors.message}</p>
                            )}
                            <input type="submit" value="Send Message" className="text-sm bg-[#309689] text-white p-2 m-2 rounded-lg cursor-pointer hover:bg-[#2a8a7d] w-fit p-3 transition-all duration-300" />
                        </div>
                    </form>
                </div>

            </div>

            <Footer />
        </main>
    )
}