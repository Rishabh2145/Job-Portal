"use client"
import Header from "@/components/Header"
import { useLazyFilterQuery } from "@/store/api/job"
import Job from "@/components/Job"
import { useEffect, useState } from "react"
import Image from "next/image"
import Footer from "@/components/Footer"
import Cards from "@/components/Cards"
import { useRouter, useSearchParams } from "next/navigation"
import { useGetCategoryQuery } from "@/store/api/dashboard"



const jobType = ['Full-Time', 'Part-Time', 'Freelance', 'Seasonal', 'Fixed-Price', 'Remote', 'Hybrid']
const experience = ['No-experience', 'Fresher', 'Intermediate', 'Expert']
const tags = ['engineering', 'design', 'ui/ux', 'marketing', 'management', 'soft', 'construction']
const company = [
    { logo: 'Icon.svg', name: 'Instagram', desc: 'Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat', noJob: 8 },
    { logo: 'Vector.svg', name: 'Tesla', desc: 'At pellentesque amet odio cras imperdiet nisl. Ac magna aliquet massa leo', noJob: 18 },
    { logo: 'Vector (1).svg', name: "McDonald's", desc: 'Odio aliquet tellus tellus maecenas. Faucibus in viverra venenatis phasellus', noJob: 12 },
    { logo: 'Icon (1).svg', name: 'Apple', desc: 'Et odio sem tellus ultrices posuere consequat. Tristique nascetur sapien ', noJob: 9 },
]


export default function Jobs() {
    const [filterJob, { isLoading, data }] = useLazyFilterQuery(
        undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const category = useGetCategoryQuery().data?.jobDetails
    
    const searchParams = useSearchParams()
    const queryParams = {
        job: searchParams.get('job') || null,
        category: searchParams.get('category') || null,
        type: searchParams.get('type') || null,
        experience: searchParams.get('experience') || null,
        dates: searchParams.get('dates') || null,
        salary: Number(searchParams.get('salary')) || 0,
        location: searchParams.get('location') || null,
        page: Number(searchParams.get('pages')) || 1
    }
    useEffect(() => {
        filterJob(queryParams)

    }, [searchParams])

    const router = useRouter()
    const [salary, setSalary] = useState(Number(queryParams.salary) || 5000)
    const [location, setLocation] = useState(queryParams.location || 'All')
    const [date, setDate] = useState(queryParams.dates || 'All')
    const [page, setPage] = useState(queryParams.page || 1)

    const jobs = data?.jobs || []
    const pages = data?.pages;

    const [toggle, setToggle] = useState(false)

    const toggleQuery = async (key, value) => {
        const current = searchParams.get(key)?.split(',') || [];
        const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
        const params = new URLSearchParams(searchParams.toString())
        params.set('pages', 1)
        updated.length ? params.set(key, updated.join(',')) : params.delete(key);
        router.replace(`/job?${params.toString()}`, { scroll: false })

    }

    const toggleSelect = async (key, value) => {
        const update = new URLSearchParams(searchParams.toString());
        if (update.length) {
            update.delete(key);
        }
        update.set(key, value);
        update.set('pages', 1)
        router.replace(`/job?${update.toString()}`, { scroll: false })
    }


    return (
        <main className="w-full flex bg-white flex-col text-black">
            <div className="flex w-full h-84 flex-col items-center bg-black justify-between pb-30">
                <Header theme="dark" page="job" />
                <h1 className="font-bold text-5xl text-white">Jobs</h1>
            </div>
            <div className="flex grid grid-cols-5 gap-6 p-4 max-md:grid-cols-1">
                <div className="flex flex-col gap-4 transition-all">
                    <button className="buttonColor h-12 font-bold text-lg min-md:hidden" onClick={() => setToggle(!toggle)}>Filter</button>
                    <div className={`flex flex-col gap-6 fadeBlue w-full p-4 rounded-xl ${toggle ? 'hidden' : 'block'} `}>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Search by Job Title</p>
                            <input
                                placeholder="Job Title or Company"
                                className="bg-white rounded-xl p-2"
                                value={queryParams?.job || ''}
                                onChange={(e) => {
                                    const params = new URLSearchParams();
                                    const job = params.get('job')
                                    if (job) {
                                        params.delete('job')
                                    }
                                    params.set('job', e.target.value)
                                    if (e.target.value.length === 0) {
                                        params.delete('job')
                                    }
                                    router.replace(`/job?${params.toString()}`, { scroll: false })
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Location</p>
                            <select className="p-2 bg-white rounded-xl" name="location" value={location} onChange={(e) => {
                                toggleSelect('location', e.target.value)
                                setLocation(e.target.value)
                            }}>
                                <option value='All'>All</option>
                                <option value='Lucknow'>Lucknow</option>
                                <option value='New Delhi'>New Delhi</option>
                                <option value='New York'>New York</option>
                                <option value='Canada'>Canada</option>
                                <option value='London'>London</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Category</p>
                            {category && category.map((item, index) => (
                                <div className="flex gap-4" key={index}>
                                    <input type="checkbox" checked={queryParams.category?.includes(item._id) || false} value={item._id} className="rounded-xl p-5" onChange={(e) => toggleQuery('category', item._id)} />
                                    <p>{item._id}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Job Type</p>
                            {jobType.map((item, index) => (
                                <div className="flex gap-4" key={index}>
                                    <input type="checkbox" checked={queryParams.type?.includes(item) || false} className="rounded-xl p-5" value={item} onChange={(e) => toggleQuery('type', item)} />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Experience Level</p>
                            {experience.map((item, index) => (
                                <div className="flex gap-4" key={index}>
                                    <input type="checkbox" value={item} checked={queryParams.experience?.includes(item) || false} className="rounded-xl p-5" onChange={(e) => toggleQuery('experience', item)} />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Date Posted</p>
                            <select className="p-2 bg-white rounded-xl" name="dates" value={date} onChange={(e) => {
                                toggleSelect('dates', e.target.value)
                                setDate(e.target.value)
                            }}>
                                <option value='All'>All</option>
                                <option value='today'>Today</option>
                                <option value='last7'>Last 7 Days</option>
                                <option value='last30'>Last 30 Days</option>
                            </select>


                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">Salary</p>
                            <input
                                type="range"
                                name="salary"
                                value={salary}
                                min={0}
                                max={9999}
                                onChange={(e) => {
                                    setSalary(e.target.value)
                                }}
                            />
                            <div className="flex justify-between items-center">
                                <p>$0 - ${salary}</p>
                                <button className="buttonColor p-1 px-4 cursor-pointer" onClick={() => {
                                    toggleSelect('salary', salary)

                                }}>{isLoading ? 'Loading...' : 'Apply'}</button>
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
                <div className="m-6 px-4 grid col-span-4 max-md:col-span-1 flex flex-col h-fit">
                    <p className="text-gray-500 font-bold">Showing Jobs {(queryParams?.page - 1) * 10 || 0} - {((queryParams?.page) * 10 > data?.totals) ? data?.totals : (queryParams?.page) * 10 || 0} of {data?.totals || 0} results</p>
                    {jobs ? jobs.map((item, index) => (
                        <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} id={item._id} isHome={true} />
                    )) : <h2>No Job Found</h2>}
                    <div className="flex self-center justify-self-center gap-4 mt-4">
                        <button className={`p-2 px-4 border border-gray-500 text-gray-700 rounded-lg cursor-pointer ${queryParams.page <= 1 ? 'hidden' : 'block'}`}
                            onClick={() => {
                                const params = new URLSearchParams(searchParams);
                                params.set('pages', page - 1)
                                router.replace(`/job?${params.toString()}`, { scroll: false })
                            }}>Prev</button>
                        {Array.from({ length: pages }, (_, i) => (
                            <button key={i} className="p-2 px-4 border border-gray-500 text-gray-700 rounded-lg cursor-pointer" onClick={() => {
                                const params = new URLSearchParams(searchParams);
                                params.set('pages', i + 1)
                                router.replace(`/job?${params.toString()}`, { scroll: false })
                            }}>{i + 1}</button>
                        ))}
                        <button className={`p-2 px-4 border border-gray-500 text-gray-700 rounded-lg cursor-pointer ${queryParams.page >= pages ? 'hidden' : 'block'}`} onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.set('pages', page + 1)
                            router.replace(`/job?${params.toString()}`, { scroll: false })
                        }}>Next</button>
                    </div>

                </div>
            </div>
            <div className="fadeBlue p-8 flex flex-col justify-center items-center">
                <div className="flex flex-col text-center py-10 gap-6">
                    <h1 className="text-5xl font-bold">Top Company</h1>
                    <p className="text-sm">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum</p>
                </div>
                <div className="grid grid-cols-4 flex gap-16 w-8/9 max-md:w-full max-md:grid-cols-1">
                    {company.map((item, index) => (
                        <Cards key={index} logo={item.logo} desc={item.desc} name={item.name} noJob={item.noJob} />
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}