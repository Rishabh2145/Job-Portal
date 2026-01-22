"use client"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import News from "@/components/News"
import { newsBlog } from "../page"
import Image from "next/image"
import Cards from "./Cards"
import FAQ from "./FAQ"

const works = [
    { logo: '/Clip path group.svg', title: 'Create Account', desc: 'Sign up with your basic details to get started. It takes less than a minute to join our platform. ' },
    { logo: '/Group.svg', title: 'Upload Resume', desc: 'Add your resume to showcase your experience and skills. This helps employers review your profile faster.' },
    { logo: '/briefcase(3) 1.svg', title: 'Find Jobs', desc: ' Search through verified openings and filter by role, location, or industry to find your ideal job.' },
    { logo: '/check-mark 1.svg', title: 'Apply Job', desc: ' Found the right role? Apply quickly and track your application in real time.' }
]

const faq = [
    {index: 1, ques: 'Can I Upload a CV?', ans: 'Yes, you can upload your CV on our platform. After creating an account, simply upload your resume to complete your profile. This allows employers to view your qualifications and consider you for relevant jobs.'},
    {index: 2, ques: 'How long will the recruitment process take?', ans: 'The recruitment process length depends on the company, role, and number of applications. Most employers respond within a few days to a couple of weeks, and you’ll receive updates as soon as your application moves to the next stage'},
    {index: 3, ques: 'Do you recruit for Graduates, Apprentices and Students?', ans: 'Yes, we recruit for graduates, apprentices, and students. Our platform is designed to support job seekers at all career stages.'},
    {index: 4, ques: 'What does the recruitment and selection process involve?', ans: 'The recruitment and selection process involves reviewing applications, conducting interviews, and evaluating candidates based on their qualifications and fit for the role.'},
    {index: 5, ques: 'Can I receive notifications for any future jobs that may interest me?', ans: 'Yes, you can set up job alerts to receive notifications about new job openings that match your preferences.'},

]

export default function Jobs() {
    return (
        <main className="w-full flex h-full bg-white flex-col items-center gap-6 text-black">
            <div className="flex w-full h-84 flex-col items-center bg-black justify-between pb-30">
                <Header theme="dark" page="about" />
                <h1 className="font-bold text-5xl text-white">About Us</h1>
            </div>
            <div className="flex grid grid-cols-2 gap-6 p-4 my-4 w-8/9 items-center max-md:grid-cols-1">
                <h1 className="text-4xl font-bold justify-self-end mr-12">About Our Platform</h1>
                <p className="">We are a dynamic job portal committed to reshaping the hiring experience for both candidates and employers. By offering real-time job listings, verified companies, and powerful search tools, we make it easier for applicants to find the right role and for businesses to discover top talent. Our goal is to support your career journey every step of the way.</p>
            </div>
            <div className="aboutTop"></div>
            <div className="flex flex-col items-center my-8">
                <div className="flex flex-col w-1/2 text-center gap-6 max-md:w-3/4">
                    <h1 className="text-3xl font-bold">How it works</h1>
                    <p className="line-clamp-2">Our platform is built for simplicity. Create a profile, browse verified job listings, and apply with a single click. Employers can post jobs, manage applications, and connect with candidates seamlessly.</p>
                </div>
                <div className="flex justify-around w-full my-8 max-md:flex-col max-md:items-center">
                    {works.map((items, index) => (
                        <Cards logo={items.logo} title={items.title} desc={items.desc} key={index} />
                    ))}
                </div>
            </div>
            <div className="aboutMid relative flex items-center justify-center max-md:flex-col">
                <div className="flex flex-col items-center justify-center gap-8 max-md:h-80">
                    <div className="play flex items-center justify-center"><Image src='/images/about/Polygon 1.svg' height={40} width={40} alt="play" /></div>
                    <h1 className="text-white text-3xl text-center font-bold w-3/4">
                        Good Life Begins With
                        A Good Company
                    </h1>
                </div>
                <div className="absolute bottom-0 z-2 text-white grid grid-cols-3 bg-black w-full max-md:grid-cols-1 max-md:relative">
                    <div className="flex p-6 gap-4">
                        <h1 className="index">1</h1>
                        <div>
                            <p className="text-xl">Build skills and advance your career.</p>
                            {/* <a className="text-[#309689]">Learn more</a> */}
                        </div>
                    </div>
                    <div className="flex justify-between p-6 gap-4">
                        <h1 className="index">2</h1>
                        <div>
                            <p className="text-xl line-clamp-2 ">Feel motivated, valued, and supported.</p>
                            {/* <a className="text-[#309689]">Learn more</a> */}
                        </div>
                    </div>
                    <div className="flex p-6 gap-4">
                        <h1 className="index">3</h1>
                        <div>
                            <p className="text-xl">Work that matches your goals and passion.</p>
                            {/* <a className="text-[#309689]">Learn more</a> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-8/9 mt-10 flex flex-col gap-8">
                <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-3xl font-bold max-md:text-3xl max-md:text-center">Frequently Asked Questions</h1>
                    <div className="flex w-1/1 justify-between max-md:text-center">
                        <p className="w-full">Find quick answers to the most commonly asked questions.</p>
                    </div>
                </div>
                { faq.map((items, index) => (
                    <FAQ key={index} index={items.index} ques={items.ques} ans={items.ans}/>
                ))}
            </div>
            <div className="flex gap-12 w-8/9 my-12 max-md:hidden">
                <div className="flex flex-1 items-center justify-end gap-6">
                    <div className="aboutLong1"></div>
                    <div className="flex flex-col gap-6">
                        <div className="aboutLong2"></div>
                        <div className="aboutLong3"></div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-12 justify-center">
                    <h1 className="text-4xl w-3/5 font-bold">We're Only Working With The Best</h1>
                    <p className="text-gray-600">Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit. </p>
                    <div className="grid flex gap-4 grid-cols-2">
                        <div className="flex items-center gap-6">
                            <Image src='\images\about\premium(2) 1 (1).svg' height={40} width={40} alt="img" />
                            <h2 className="text-lg font-bold">Quality Job</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <Image src='\images\about\resume(1).svg' height={40} width={40} alt="img" />
                            <h2 className="text-lg font-bold">Resume builder</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <Image src='\images\about\quality-assurance 1.svg' height={40} width={40} alt="img" />
                            <h2 className="text-lg font-bold">Top Companies</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <Image src='\images\about\excellence(1) 2.svg' height={40} width={40} alt="img" />
                            <h2 className="text-lg font-bold">Top Talents</h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </main>
    )
}