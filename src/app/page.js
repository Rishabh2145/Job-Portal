"use client"

import Image from "next/image";
import Job from "@/components/Job";
import Category from "@/components/Category";
import Review from "@/components/Review";
import News from "@/components/News";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetJobQuery } from "@/store/api/job";

export const cat = [
    { image: "agriculture 2.svg", name: "Agriculture", job: "1254" },
    { image: "Group.svg", name: "Media Production", job: "816" },
    { image: "agriculture 2 (1).svg", name: "Commerce", job: "2082" },
    { image: "agriculture 2 (2).svg", name: "Construction", job: "1520" },
    { image: "agriculture 2 (3).svg", name: "Hotels & Tourism", job: "1022" },
    { image: "agriculture 2 (4).svg", name: "Education", job: "1496" },
    { image: "g756.svg", name: "Financial Services", job: "1529" },
    { image: "agriculture 2 (5).svg", name: "Transport", job: "1244" },
]

export const jobs = [
    { time: "10", logo: "Logo (4).svg", title: "Forward Security Director", company: "Bauch, Schuppe and Schulist Co", category: "Hotels & Tourism", type: "Full Time", salary: "$40000 - $42000", location: "New York, USA" },
    { time: "12", logo: "Logo (5).svg", title: "Regional Creative Facilitator", company: "Wisozk - Becker Co", category: "Media", type: "Part Time", salary: "$28000-$32000", location: "Los- Angeles, USA" },
    { time: "15", logo: "Logo.svg", title: "Internal Integration Planner", company: "Mraz, Quigley and Feest Inc.", category: "Construction", type: "Full Time", salary: "$48000-$50000", location: "Texas, USA" },
    { time: "24", logo: "Logo (7).svg", title: "District Intranet Director", company: "VonRueden - Weber Co", category: "Commerce", type: "Full Time", salary: "$42000-$48000", location: "Florida, USA" },
    { time: "26", logo: "Logo (8).svg", title: "Corporate Tactics Facilitator", company: "Cormier, Turner and Flatley Inc", category: "Commerce", type: "Full Time", salary: "$38000-$40000", location: "Boston, USA" },
]

export const sample = "At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementumid scelerisque rhoncus. Lectus dolor blandit massa pretium id ultrices phasellus tortor. Risus risus lectus augue justo lacus viverra sit. Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit. Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat aenean. Vulputate praesent congue faucibus in euismod feugiat euismod volutpat. Adipiscing risus amet phasellus imperdiet eget vel pulvinar. Risus in felis faucibus sit. Scelerisque consequat iaculis mauris amet vel felis id tincidunt nunc."


const testimony = [
    { rate: 5, title: "Amazing services", message: "Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis ", name: "Marco Kihn", position: "Happy Client", photo: "/images/review/Avatar.svg" },
    { rate: 5, title: "Everything simple ", message: "Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus", name: "Kristin Hester", position: "Happy Client", photo: "/images/review/Avatar (1).svg" },
    { rate: 5, title: "Awesome, thank you!", message: "Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus. Nulla et tempor montes", name: "Zion Cisneros", position: "Happy Client", photo: "/images/review/Avatar (2).svg" },
]


export const newsBlog = [
    { type: "News", thumb: '/images/news/news1.png', date: "30 March 2024", title: "Revitalizing Workplace Morale: Innovative Tactics for Boosting Employee Engagement in 2024", height: 636, width: 540 },
    { type: "Blog", thumb: '/images/news/news2.png', date: "30 March 2024", title: "How to avoid the top six most common job interview mistakes", height: 836, width: 800 },
]


export default function HomePage() {
    const router = useRouter()
    const jobData = useGetJobQuery(
        undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    }
    )
    let data = []
    data = jobData?.data?.jobs || []
    const jobs = [...data].reverse();

    return (
        <main className="bg-white w-screen max-w-screen flex flex-col items-center">
            <div className="h-screen w-screen">
                <div className="bg-[url('/images/home/bg.png')] bg-cover h-5/6 flex flex-col text-white items-center w-full" >
                    <div className="h-full w-full flex flex-col items-center bg-black/70">
                        <Header theme='dark' page='home' />
                        <div className="basis-1/1 flex flex-col justify-center items-center max-md:mt-6">
                            <h1 className="text-6xl font-bold max-md:text-4xl max-md:text-wrap max-md:text-center">
                                Find Your Dream Job Today!
                            </h1>
                            <p className="text-lg mt-4 text-white/70 max-md:text-center max-md:px-4">Connecting Talent with Opportunity: Your Gateway to Carrier Success</p>
                            <div className="bg-white flex justify-center items-center rounded-2xl w-6/7 h-18 mt-8 gap-2 , max-md:flex max-md:flex-col max-md:h-full max-md:m-5 max-md:justify-around max-md:p-4 max-md:h-full ">
                                <input
                                    type="text"
                                    placeholder="Job Title or Company"
                                    className="rounded-l-lg h-full text-black/60 basis-1/1 text-center max-md:w-4/5 max-md:border-b max-md:rounded-none"
                                />
                                <select className="rounded-lg text-black/30 text-center basis-1/1 h-full max-md:w-4/5 max-md:border-b max-md:rounded-none">
                                    <option>Select Location</option>
                                    <option>New York</option>
                                    <option>San Francisco</option>
                                    <option>Los Angeles</option>
                                    <option>Chicago</option>
                                </select>
                                <select className="rounded-lg text-black/30 h-full text-center basis-1/1 max-md:w-4/5 max-md:border-b max-md:rounded-none">
                                    <option>Select Categories</option>
                                    <option>IT</option>
                                    <option>Finance</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                </select>
                                <button className="bg-[#309689] text-lg h-full rounded-r-2xl basis-1/1 cursor-pointer flex justify-center items-center max-md:w-9/10 max-md:rounded-2xl max-md:my-2">
                                    <Image src="/images/home/search.svg" alt="Arrow Side" width={20} height={10} className="inline-block mr-2" />
                                    Search Job</button>
                            </div>
                            <div className="flex justify-around w-full p-8 mt-8 max-md:my-2 max-md:mb-4 max-md:p-2">
                                <div className="flex justify-center items-center gap-4 max-md:gap-2">
                                    <div className="flex justify-center items-center p-4 bg-[#309689] rounded-full max-md:p-3"><Image src="/images/home/briefcase(2) 2.svg" alt="Arrow Side" width={30} height={30} className="inline-block" /></div>
                                    <div><h2 className="font-bold text-lg max-md:text-sm">25,850</h2><p className="text-sm text-white/70 max-md:text-xs">Jobs</p></div>
                                </div>
                                <div className="flex justify-center items-center gap-4 max-md:gap-2">
                                    <div className="flex justify-center items-center p-4 bg-[#309689] rounded-full max-md:p-3"><Image src="/images/home/g2079.svg" alt="Arrow Side" width={30} height={30} className="inline-block" /></div>
                                    <div><h2 className="font-bold text-lg max-md:text-sm">10,250</h2><p className="text-sm text-white/70 max-md:text-xs">Candidates</p></div>
                                </div>
                                <div className="flex justify-center items-center gap-4 max-md:gap-2">
                                    <div className="flex justify-center items-center p-4 bg-[#309689] rounded-full max-md:p-3"><Image src="/images/home/building 1.svg" alt="Arrow Side" width={30} height={30} className="inline-block" /></div>
                                    <div><h2 className="font-bold text-lg max-md:text-sm">18,400</h2><p className="text-sm text-white/70 max-md:text-xs">Companies</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-1/6 bg-black flex justify-between items-center px-20 max-md:flex max-md:whitespace-nowrap max-md:overflow-auto max-md:justify-start max-md:px-6 max-md:gap-12">
                    <Image src="/images/home/logo (3).svg" alt="slack" width={150} height={200} className="h-full" />
                    <Image src="/images/home/logos.svg" alt="slack" width={150} height={200} className="h-full" />
                    <Image src="/images/home/logo.svg" alt="slack" width={150} height={200} className="h-full" />
                    <Image src="/images/home/logo (1).svg" alt="slack" width={150} height={200} className="h-full" />
                    <Image src="/images/home/logo (2).svg" alt="slack" width={150} height={200} className="h-full" />
                </div>
            </div>
            <div className="p-12 text-black w-9/10 max-w-screen max-md:w-1/1 max-md:w-1/1 max-md:px-4">
                <h1 className="text-5xl font-bold max-md:text-center max-md:text-2xl">
                    Recent Jobs Available
                </h1>

                <div className="flex w-full justify-between mt-4 ">
                    <div className="truncate basis-1/2 max-md:basis-1/1">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scelerisque rhoncus. Lectus dolor blandit massa pretium id ultrices phasellus tortor. Risus risus lectus augue justo lacus viverra sit. Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit. Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat aenean. Vulputate praesent congue faucibus in euismod feugiat euismod volutpat. Adipiscing risus amet phasellus imperdiet eget vel pulvinar. Risus in felis faucibus sit. Scelerisque consequat iaculis mauris amet vel felis id tincidunt nunc.</div>
                    <a href="/job" className="basis-1/2 flex justify-end text-[#309689] underline max-md:hidden">View All</a>
                </div>

                {jobs ? jobs.map((item, index) => (
                    <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} id={item._id}/>
                )) : <>Loading...</>}
            </div>

            <div className="w-screen bg-[#309689]/10 flex flex-col items-center p-12 text-black gap-6 max-md:px-4">
                <h1 className="text-5xl text-black font-bold max-md:text-center max-md:text-3xl">
                    Browse by Category
                </h1>
                <p className="truncate w-1/2 max-md:w-1/1">{sample}</p>

                <div className="grid grid-cols-4 gap-8 mt-8 w-6/7 justify-around items-center max-md:grid-cols-1 max-md:w-1/1">
                    {cat.map((item, index) => (
                        <Category key={index} image={item.image} name={item.name} job={item.job} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-8 mt-8 items-center p-12 w-full max-md:px-4">
                <div className="flex justify-around grid grid-cols-2 gap-12 w-6/7 max-md:grid-cols-1 max-md:w-1/1">
                    <Image src="/images/2d06aa8e8fc000b178415436b8a2841272f9c9ba.png" alt="Blur" width={550} height={514} className="rounded-3xl" />
                    <div className="flex flex-col justify-center gap-6 text-black">
                        <h1 className="text-5xl font-bold w-9/10 max-md:text-2xl max-md:text-center">
                            Good Life Begins With A Good Company
                        </h1>
                        <p className="line-clamp-4 max-md:text-center">
                            Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit. Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat aenean. Vulputate praesent congue faucibus in euismod feugiat euismod volutpat. Adipiscing risus amet phasellus imperdiet eget vel pulvinar. Risus in felis faucibus sit. Scelerisque consequat iaculis mauris amet vel felis id tincidunt nunc.
                        </p>
                        <div className="flex items-center gap-6 mt-8">
                            <a href="/job" className="bg-[#309689] p-2 rounded-lg px-4 text-white hover:scale-105 transition-all shadow-xl max-md:w-full max-md:p-4 max-md:text-center">
                                Search Job
                            </a>
                            <a href="/about" className="text-[#309689] underline hover:scale-105 transition-all max-md:hidden">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
                <div className="justify-center items-center gap-8 mt-8 items-center p-12 text-black grid grid-cols-3 w-full max-md:grid-cols-1 max-md:text-center max-md:mt-4 ">
                    <div className="flex flex-col gap-4">
                        <p className="text-4xl font-bold text-[#309689] ">12k+</p>
                        <p className="text-xl font-bold">Clients worldwide</p>
                        <p className="line-clamp-3">{sample}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-4xl font-bold text-[#309689] ">20k+</p>
                        <p className="text-xl font-bold">Active Resume</p>
                        <p className="line-clamp-3">{sample}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-4xl font-bold text-[#309689] ">18k+</p>
                        <p className="text-xl font-bold">Companies</p>
                        <p className="line-clamp-3">{sample}</p>
                    </div>
                </div>
                <div className="bg-black h-96 w-11/12 rounded-3xl flex justify-center items-center text-white max-md:flex-col-reverse max-md:w-1/1 max-md:h-126 max-md:text-center max-md:py-10">
                    <div className="w-3/4 p-12 gap-2 flex flex-col max-md:w-1/1 max-md:p-4 ">
                        <div className="text-5xl font-bold max-md:text-3xl"> Create a Better <br /> Future for Yourself</div>
                        <div className="line-clamp-2 mt-2">{sample}</div>
                        <a className="p-4 bg-[#309689] rounded-lg text-white mt-6 size-fit flex justify-center items-center hover:scale-105 transition-all shadow-xl max-md:w-full" href="/job">
                            Search Job
                        </a>
                    </div>
                    <div className="bg-[url('/images/Imgs.svg')] h-full bg-contain bg-no-repeat w-full"></div>
                </div>
            </div>
            <div className="w-screen bg-[#309689]/10 flex flex-col items-center p-12 text-black gap-4 max-md:px-4">
                <h1 className="text-5xl mt-6 font-bold max-md:text-4xl max-md:text-center">
                    Testimonials from Our Customers
                </h1>
                <p className="text-sm w-1/2 truncate max-md:w-1/1">{sample}</p>

                <div className="flex justify-center grid gap-6 p-6 mt-12 items-center justify-items-center grid-cols-3 max-md:grid-cols-1 max-md:p-2">
                    {testimony.map((item, index) => (
                        <Review key={index} rate={item.rate} title={item.title} message={item.message} name={item.name} position={item.position} photo={item.photo} />
                    ))}
                </div>
            </div>
            <div className="w-screen flex flex-col items-center p-12 text-black gap-4 max-md:px-0 max-md:pb-0 max-md:m-0">
                <div className="flex w-10/10 flex-col">
                    <div className="flex flex-col w-1/1 gap-4">
                        <h1 className="text-5xl font-bold max-md:text-3xl max-md:text-center">News and Blogs</h1>
                        <div className="flex w-1/1 justify-between max-md:text-center">
                            <p className="w-full">Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor</p>
                            <a className="text-[#309689] underline font-bold w-full flex justify-end cursor-pointer max-md:hidden">
                                View all
                            </a>
                        </div>
                    </div>
                    <div className="flex max-md:overflow-x-auto max-md:w-screen max-md:m-0 max-md:whitespace-nowrap ">
                        {newsBlog.map((item, index) => (
                            <News key={index} type={item.type} thumb={item.thumb} date={item.date} title={item.title} height={item.height} width={item.width} />
                        ))}
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}