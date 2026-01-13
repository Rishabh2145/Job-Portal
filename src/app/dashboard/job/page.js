"use client"
import Job from "@/components/Job"
import { useGetJobQuery, useGetBookmarkQuery } from "@/store/api/job"
import { flightRouterStateSchema } from "next/dist/server/app-render/types"

export default function Course() {
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

    return (
        <div className="m-6 px-4">
            <h1 className="text-2xl p-4 pb-0 font-bold">Bookmarks</h1>
            {bookJobs ? bookJobs.bookmarks.bookmarks.map((item, index) => (
                <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} isHome={false} salary={item.salary} location={item.location} id={item._id} bookmark={true} />
            )) : <>Loading...</>}
            <h1 className="text-2xl p-4 pb-0 font-bold">Jobs</h1>
            {nonBookmarkedJobs ? nonBookmarkedJobs.map((item, index) => (
                <Job key={index} time={String(item.createdAt)} logo={item.companyImage} isHome={false} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} id={item._id} bookmark={false} />
            )) : <>Loading...</>}
        </div>
    )
}