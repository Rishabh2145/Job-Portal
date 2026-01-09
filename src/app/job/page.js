"use client"
import Header from "@/components/Header"
import { useGetJobQuery } from "@/store/api/job"
import Job from "@/components/Job"
import { cat } from "../page"
import { useState } from "react"
import Image from "next/image"
import Footer from "@/components/Footer"
import Cards from "@/components/Cards"

const jobType = ['Full Time', 'Part Time', 'Freelance', 'Seasonal', 'Fixed-Price', 'Remote', 'Hybrid']
const experience = ['No-experience', 'Fresher', 'Intermediate', 'Expert']
const posted = ['All', 'Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days']
const tags = ['engineering', 'design', 'ui/ux', 'marketing', 'management', 'soft', 'construction']
const company = [
    {logo: 'Icon.svg', name: 'Instagram', desc: 'Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat', noJob: 8 },
    {logo: 'Vector.svg', name: 'Tesla', desc: 'At pellentesque amet odio cras imperdiet nisl. Ac magna aliquet massa leo', noJob: 18 },
    {logo: 'Vector (1).svg', name: "McDonald's", desc: 'Odio aliquet tellus tellus maecenas. Faucibus in viverra venenatis phasellus', noJob: 12 },
    {logo: 'Icon (1).svg', name: 'Apple', desc: 'Et odio sem tellus ultrices posuere consequat. Tristique nascetur sapien ', noJob: 9 },
]


export default function Jobs() {
    const jobData = useGetJobQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    const [salary, setSalary] = useState(5000)
    let data = []
    data = jobData?.data?.jobs || []
    const jobs = [...data].reverse();
    const [toggle, setToggle] = useState(false)

    
    return (
        <main className="w-full flex bg-white flex-col text-black">
            <div className="flex w-full h-84 flex-col items-center bg-black justify-between pb-30">
                <Header theme="dark" page="job" />
                <h1 className="font-bold text-5xl text-white">Jobs</h1>
            </div>
            <div className="flex grid grid-cols-5 gap-6 p-4 max-md:grid-cols-1">
                <div className="flex flex-col gap-4 transition-all">
                    <button className="buttonColor h-12 font-bold text-lg min-md:hidden" onClick={()=> setToggle(!toggle)}>Filter</button>
                    <div className={`flex flex-col gap-6 fadeBlue w-full p-4 rounded-xl ${toggle ? 'hidden' : 'block'} `}>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Search by Job Title</p>
                            <input
                                placeholder="Job Title or Company"
                                className="bg-white rounded-xl p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Location</p>
                            <select className="p-2 bg-white rounded-xl">
                                <option value='Lucknow'>Lucknow</option>
                                <option value='New Delhi'>New Delhi</option>
                                <option value='New York'>New York</option>
                                <option value='Canada'>Canada</option>
                                <option value='London'>London</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Category</p>
                            {cat.map((item, index) => (
                                <div className="flex gap-4" key={index}>
                                    <input type="checkbox" className="rounded-xl p-5" />
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Job Type</p>
                            {jobType.map((item, index) => (
                                <div className="flex gap-4" key={index}>
                                    <input type="checkbox" className="rounded-xl p-5" />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Experience Level</p>
                            {experience.map((item, index) => (
                                <div className="flex gap-4" key={index}>
                                    <input type="checkbox" className="rounded-xl p-5" />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Date Posted</p>
                            {posted.map((item, index) => (
                                <div className="flex gap-4" key={index}>
                                    <input type="checkbox" className="rounded-xl p-5" />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Salary</p>
                            <input
                                type="range"
                                value={salary}
                                min={0}
                                max={9999}
                                onChange={(e) => setSalary(e.target.value)
                                }
                            />
                            <div className="flex justify-between items-center">
                                <p>$0 - ${salary}</p>
                                <button className="buttonColor p-1 px-4">Apply</button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Tags</p>
                            <div className="grid grid-cols-2 flex gap-4">
                                {tags.map((item, index) => (
                                    <a key={index} className="text-sm mx-1 fadeBlue flex justify-center items-center rounded-xl p-1 text-[#309689] cursor-pointer">{item}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute text-white p-5 flex flex-col gap-2 py-6">
                            <h1 className="text-3xl font-bold">WE ARE HIRING</h1>
                            <h3 className="text-xl">Apply Now!</h3>
                        </div>
                        <Image src='/images/jobs/hiring.png' alt="Hiring" width={400} height={100} className="rounded-3xl " />
                    </div>
                </div>
                <div className="m-6 px-4 grid col-span-4 max-md:col-span-1">
                    <p className="text-gray-500 font-bold">Showing Jobs {jobs.length} - {jobs.length} of {jobs.length} results</p>
                    {jobs.map((item, index) => (
                        <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} id={item._id}/>
                    ))}
                </div>
            </div>
            <div className="fadeBlue p-8 flex flex-col justify-center items-center">
                <div className="flex flex-col text-center py-10 gap-6">
                    <h1 className="text-5xl font-bold">Top Company</h1>
                    <p className="text-sm">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum</p>
                </div>
                <div className="grid grid-cols-4 flex gap-16 w-8/9 max-md:w-full max-md:grid-cols-1">
                    {company.map((item, index)=> (
                        <Cards key={index} logo={item.logo} desc={item.desc} name={item.name} noJob={item.noJob}/>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}