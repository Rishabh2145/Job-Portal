"use client"
import { useGetBookmarkQuery, useGetJobQuery } from "@/store/api/job";
import { jobs, sample } from "../page";
import { useState } from "react";
import Job from "@/components/Job";
export default function HomePage() {
    const jobData = useGetJobQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    const bookmark = useGetBookmarkQuery()
    let data = []
    data = jobData?.data?.jobs || []
    const jobs = [...data].reverse();
    const bookJobs = bookmark?.data;
    const bookmarkedIds = new Set(
        (bookJobs?.bookmarks?.bookmarks || []).map((b) => b._id?.toString() ?? b.toString())
    );
    const nonBookmarkedJobs = jobs.filter(
        (job) => !bookmarkedIds.has(job._id.toString())
    );

    const [filter, setFilter] = useState('All')

    return (
        <div className="p-5 px-7 py-6">
            <div className="bg-black h-76 w-full rounded-3xl flex justify-center items-center text-white max-md:flex-col-reverse max-md:w-1/1 max-md:h-126 max-md:text-center max-md:py-10">
                <div className="w-3/4 p-12 gap-2 flex flex-col max-md:w-1/1 max-md:p-4 ">
                    <div className="text-4xl font-bold max-md:text-3xl"> Create a Better <br /> Future for Yourself</div>
                    <div className="line-clamp-2 mt-2">{sample}</div>
                    <a className="p-4 bg-[#309689] rounded-lg text-white mt-6 size-fit flex justify-center items-center hover:scale-105 transition-all shadow-xl max-md:w-full" href="/job">
                        Search Job
                    </a>
                </div>
                <div className="bg-[url('/images/Imgs.svg')] h-full bg-contain bg-no-repeat w-full"></div>
            </div>
            <div className="px-1">
                <div className="flex items-center justify-between mt-4">
                    <h1 className="text-2xl p-4 font-bold self-center">{filter} Jobs</h1>
                    <select className="p-4 rounded-xl border border-gray-600 bg-white" onChange={(e) => setFilter(e.target.value)}>
                        <option value='All'>All</option>
                        <option value='Bookmarked'>Bookmarks</option>
                        <option value=''>Not Bookmarks</option>
                    </select>
                </div>

                <div className={`${filter !== '' ? 'block' : 'hidden'}`}>
                    {bookJobs ? bookJobs.bookmarks.bookmarks.map((item, index) => (
                        <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} id={item._id} bookmark={true} isHome={false} />
                    )) : <>Loading...</>}
                </div>

                <div className={`${filter !== 'Bookmarked' ? 'block' : 'hidden'}`}>
                    {nonBookmarkedJobs ? nonBookmarkedJobs.map((item, index) => (
                    <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} isHome={false} id={item._id} bookmark={false} />
                )) : <>Loading...</>}
                </div>
            </div>
        </div>
    )
}

