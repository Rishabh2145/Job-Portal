"use client"
import Applied from "@/components/Applied"
import { useGetAppliedJobQuery } from "@/store/api/job"

export default function Course() {
    const jobData = useGetAppliedJobQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    
    let data = []
    
    data = jobData?.data?.jobs || []
    const jobsData = [...data].reverse()
    
    

    return (
        <div className="m-6 px-4">
            <h1 className="text-2xl p-4 pb-0 font-bold">Applied Jobs</h1>
            {jobsData ? jobsData.map((item, index) => (
                <Applied key={index} companyImage={item?.Jobs[0].companyImage} title={item?.Jobs[0].title} company={item?.Jobs[0].company} category={item?.Jobs[0].category} jobType={item?.Jobs[0].jobType} salary={item?.Jobs[0].salary} location={item?.Jobs[0].location} _id={item?.Jobs[0]._id} status={item.status}/>
            )) : <>Loading...</>}
        </div>
    )
}