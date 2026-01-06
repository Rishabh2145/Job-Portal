"use client"
import { jobs } from "@/app/page"
import Job from "@/components/Job"
import { useGetJobQuery } from "@/store/api/job"

export default function Course() {
    const jobData = useGetJobQuery( undefined,{
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    let data = []
    data = jobData?.data?.jobs || []
    const jobs = [...data].reverse();
    if (!jobs) {
        return <>Loading...</>
    }
    
    return (
        <div className="m-6 px-4">
            {jobs.map((item, index) => (
                <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} />
            ))}
        </div>
    )
}