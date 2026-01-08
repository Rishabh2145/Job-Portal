"use client"
import Header from "@/components/Header"
import { useGetJobQuery } from "@/store/api/job"
import Job from "@/components/Job"
import { cat } from "../page"
export default function Jobs() {
    const jobData = useGetJobQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    let data = []
    data = jobData?.data?.jobs || []
    const jobs = [...data].reverse();
    console.log(cat)
    return (
        <main className="w-full flex h-full bg-white flex-col text-black">
            <div className="flex w-full h-84 flex-col items-center bg-black justify-between pb-30">
                <Header theme="dark" page="job" />
                <h1 className="font-bold text-5xl text-white">Jobs</h1>
            </div>
            <div className="flex grid grid-cols-5 gap-6 p-4">
                <div className="flex flex-col gap-6 grid grid-cols-1 fadeBlue h-full w-full bg-[#309689]/10 p-4 rounded-xl">
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
                        {cat.map((items, key) => {
                            <div>
                                {/* <input
                                    key={key}
                                    type="checkbox"
                                    id={items.name}
                                    className="bg-white"
                                /> */}
                                <label>{items.name}</label>
                            </div>
                        })}
                    </div>

                </div>
                <div className="m-6 px-4 grid col-span-4">
                    <p>Showing Jobs</p>
                    {jobs.map((item, index) => (
                        <Job key={index} time={String(item.createdAt)} logo={item.companyImage} title={item.title} company={item.company} category={item.category} type={item.jobType} salary={item.salary} location={item.location} />
                    ))}
                </div>
            </div>
        </main>
    )
}