"use client"

import Image from "next/image";
import Job from "@/components/Job";
import Category from "@/components/Category";
import Review from "@/components/Review";
import News from "@/components/News";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useGetJobQuery } from "@/store/api/job";
import { useFormik } from "formik";
import { useGetReviewQuery } from "@/store/api/user";
import { useGetCadidateQuery, useGetCategoryQuery, useGetCompanyQuery } from "@/store/api/dashboard";

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

const imgCat = ['agriculture 2.svg', 'Group.svg', 'agriculture 2 (1).svg', 'agriculture 2 (2).svg', 'agriculture 2 (3).svg', 'agriculture 2 (4).svg', 'agriculture 2 (5).svg', 'g756.svg']


export const sample = "At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementumid scelerisque rhoncus. Lectus dolor blandit massa pretium id ultrices phasellus tortor. Risus risus lectus augue justo lacus viverra sit. Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit. Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat aenean. Vulputate praesent congue faucibus in euismod feugiat euismod volutpat. Adipiscing risus amet phasellus imperdiet eget vel pulvinar. Risus in felis faucibus sit. Scelerisque consequat iaculis mauris amet vel felis id tincidunt nunc."



export default function HomePage() {
    const reviews = useGetReviewQuery()
    const category = useGetCategoryQuery().data?.jobDetails
    const company = useGetCompanyQuery()
    const candidate = useGetCadidateQuery()
    const companyData = company?.data
    const testimony = reviews?.data?.reviews
    const router = useRouter()
    const totalCandidates = candidate?.data?.user;
    const activeResume = candidate?.data?.resume;
    const totalClient = candidate?.data?.client;
    const jobData = useGetJobQuery(
        undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    }
    )
    let data = []
    data = jobData?.data?.jobs || []
    const jobs = [...data].reverse();

    const search = useFormik({
        initialValues: {
            title: '',
            location: 'Lucknow',
            category: 'Agriculture'
        },
        onSubmit : (values) => {
            router.replace(`/job?job=${values.title}&location=${values.location}&category=${values.category}`)
        }
    })

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
                            <form onSubmit={search.handleSubmit} className="bg-white flex justify-center items-center rounded-2xl w-6/7 h-18 mt-8 gap-2 , max-md:flex max-md:flex-col max-md:h-full max-md:m-5 max-md:justify-around max-md:p-4 max-md:h-full ">
                                <input
                                    type="text"
                                    placeholder="Job Title or Company"
                                    className="rounded-l-lg h-full text-black/60 basis-1/1 text-center max-md:w-4/5 max-md:border-b max-md:rounded-none"
                                    name="title"
                                    id="title"
                                    onChange={search.handleChange}
                                    value={search.values.title}
                                />
                                <select className="rounded-lg text-black/30 text-center basis-1/1 h-full max-md:w-4/5 max-md:border-b max-md:rounded-none" name="location" id="location" onChange={search.handleChange} value={search.values.location}>
                                    {category && category.map((item, index) => (
                                        <option key={index} value={item._id}>{item._id}</option>
                                    ))}
                                </select>
                                <select className="rounded-lg text-black/30 h-full text-center basis-1/1 max-md:w-4/5 max-md:border-b max-md:rounded-none" name="category" id="category" onChange={search.handleChange} value={search.values.category}>
                                    
                                    <option value='Agriculture'>Agriculture</option>
                                    <option value='Media Production'>Media Production</option>
                                    <option value='Commerce'>Commerce</option>
                                    <option value='Construction'>Construction</option>
                                    <option value='Hotels & Tourism'>Hotels & Tourism</option>
                                    <option value='Education'>Education</option>
                                    <option value='Financial Services'>Financial Services</option>
                                    <option value='Transport'>Transport</option>
                                </select>
                                <button type="submit" className="bg-[#309689] text-lg h-full rounded-r-2xl basis-1/1 cursor-pointer flex justify-center items-center max-md:w-9/10 max-md:rounded-2xl max-md:my-2">
                                    <Image src="/images/home/search.svg" alt="Arrow Side" width={20} height={10} className="inline-block mr-2" />
                                    Search Job</button>
                            </form>
                            <div className="flex justify-around w-full p-8 mt-8 max-md:my-2 max-md:mb-4 max-md:p-2">
                                <div className="flex justify-center items-center gap-4 max-md:gap-2">
                                    <div className="flex justify-center items-center p-4 bg-[#309689] rounded-full max-md:p-3"><Image src="/images/home/briefcase(2) 2.svg" alt="Arrow Side" width={30} height={30} className="inline-block" /></div>
                                    <div><h2 className="font-bold text-lg max-md:text-sm">{companyData?.totalJobs[0]?.totalJobs> 1e6 ? companyData?.totalJobs[0]?.totalJobs + 'M+' : companyData?.totalJobs[0]?.totalJobs}</h2><p className="text-sm text-white/70 max-md:text-xs">Jobs</p></div>
                                </div>
                                <div className="flex justify-center items-center gap-4 max-md:gap-2">
                                    <div className="flex justify-center items-center p-4 bg-[#309689] rounded-full max-md:p-3"><Image src="/images/home/g2079.svg" alt="Arrow Side" width={30} height={30} className="inline-block" /></div>
                                    <div><h2 className="font-bold text-lg max-md:text-sm">{totalCandidates > 1e6 ? totalCandidates + 'M+' : totalCandidates}</h2><p className="text-sm text-white/70 max-md:text-xs">Candidates</p></div>
                                </div>
                                <div className="flex justify-center items-center gap-4 max-md:gap-2">
                                    <div className="flex justify-center items-center p-4 bg-[#309689] rounded-full max-md:p-3"><Image src="/images/home/building 1.svg" alt="Arrow Side" width={30} height={30} className="inline-block" /></div>
                                    <div><h2 className="font-bold text-lg max-md:text-sm">{companyData?.company[0]?.totalCategory > 1e6 ? companyData?.company[0]?.totalCategory + 'M+' : companyData?.company[0]?.totalCategory}</h2><p className="text-sm text-white/70 max-md:text-xs">Companies</p></div>
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
                    <div className="truncate basis-1/2 max-md:basis-1/1">Browse the freshest job openings and apply to positions that fit your profile.</div>
                    <a href="/job" className="basis-1/2 flex justify-end text-[#309689] underline max-md:hidden">View All</a>
                </div>

                {jobs ? jobs.slice(0,5).map((item, index) => (
                    <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} id={item._id}/>
                )) : <>Loading...</>}
            </div>

            <div className="w-screen bg-[#309689]/10 flex flex-col items-center p-12 text-black gap-6 max-md:px-4">
                <h1 className="text-5xl text-black font-bold max-md:text-center max-md:text-3xl">
                    Browse by Category
                </h1>
                <p className="truncate w-1/2 max-md:w-1/1">Find what you're looking for faster. Explore all our categories and jump straight into the content that matters to you.</p>

                <div className="grid grid-cols-4 gap-8 mt-8 w-6/7 justify-around items-center max-md:grid-cols-1 max-md:w-1/1">
                    {category && category.map((item, index) => (
                        <Category key={index} image={imgCat[index]}  name={item._id} job={item.count} />
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
                        <p className="text-4xl font-bold text-[#309689] ">{totalClient > 1e6 ? totalClient + 'M+' : totalCandidates > 1e3 ? totalCandidates + 'k+' : totalCandidates}</p>
                        <p className="text-xl font-bold">Clients worldwide</p>
                        <p className="line-clamp-3">{`Trusted by over ${totalClient > 1e6 ? totalClient + 'M+' : totalCandidates > 1e3 ? totalCandidates + 'k+' : totalCandidates} clients across the globe, our platform has grown into a reliable name in the industry. We take pride in providing consistent quality, unmatched support, and services that deliver real results.`}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-4xl font-bold text-[#309689] ">{activeResume > 1e6 ? activeResume + 'M+' : activeResume > 1e3 ? activeResume + 'k+' : activeResume}</p>
                        <p className="text-xl font-bold">Active Resume</p>
                        <p className="line-clamp-3">{`Our platform features ${activeResume > 1e6 ? activeResume + 'M+' : activeResume > 1e3 ? activeResume + 'k+' : activeResume} active resumes from job-ready candidates. Each resume is up-to-date, validated, and designed to help employers connect with the right talent instantly.`}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-4xl font-bold text-[#309689] ">{companyData?.company[0]?.totalCategory > 1e6 ? companyData?.company[0]?.totalCategory + 'M+' : companyData?.company[0]?.totalCategory > 1e3 ? companyData?.company[0]?.totalCategory + 'k+' : companyData?.company[0]?.totalCategory}</p>
                        <p className="text-xl font-bold">Companies</p>
                        <p className="line-clamp-3">{`Browse job openings and career opportunities from ${companyData?.company[0]?.totalCategory > 1e6 ? companyData?.company[0]?.totalCategory + 'M+' : companyData?.company[0]?.totalCategory > 1e3 ? companyData?.company[0]?.totalCategory + 'k+' : companyData?.company[0]?.totalCategory} verified companies. Each organization is carefully selected to provide reliable and high-quality employment options.`}</p>
                    </div>
                </div>
                <div className="bg-black h-96 w-11/12 rounded-3xl flex justify-center items-center text-white max-md:flex-col-reverse max-md:w-1/1 max-md:h-126 max-md:text-center max-md:py-10">
                    <div className="w-3/4 p-12 gap-2 flex flex-col max-md:w-1/1 max-md:p-4 ">
                        <div className="text-5xl font-bold max-md:text-3xl"> Create a Better <br /> Future for Yourself</div>
                        <div className="line-clamp-2 mt-2">Take control of your career and open the door to new opportunities. With the right guidance, resources, and support, you can build a future that reflects your ambitions and strengths.</div>
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
                <p className="text-sm w-1/2 truncate max-md:w-1/1">Hear what real users have to say about their experience. Their stories reflect the trust and value we strive to deliver every day.</p>

                <div className="flex justify-center grid gap-6 p-6 mt-12 items-center justify-items-center grid-cols-3 max-md:grid-cols-1 max-md:p-2">
                    {testimony ? testimony.map((item, index) => (
                        <Review key={index} rate={item.star} title={item.title} message={item.desc} name={item.User.fullName} position="Happy Clients" photo={item.User.avatar} />
                    )) : <>No Data Found</>}
                </div>
            </div>
            <Footer />
        </main>
    );
}