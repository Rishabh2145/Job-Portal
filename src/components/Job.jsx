"use client"
import { handleError, handleSuccess } from "@/app/utils";
import { useBookmarkMutation } from "@/store/api/job";
import Image from "next/image";
import moment from "moment";

export default function Job(props) {
    const [bookmark, { isLoading }] = useBookmarkMutation();

    const handleBookmark = async (jobId) => {
        try {
            const res = await bookmark({ jobId }).unwrap()
            handleSuccess(res.message)
        } catch (err) {
            handleError(err?.data.message)
            console.log(err)
        }
    }
    
    return (
        <div className="flex flex-col justify-between h-fit mt-8 gap-6 shadow-lg p-6 rounded-xl hover:shadow-xl hover:scale-102 transition-all cursor-pointer bg-white w-full">
            <div className="flex w-full justify-between">
                <p className="bg-[#309689]/20 text-[#309689] px-2 py-1 rounded-lg text-sm">
                    { moment(props.time).fromNow() }
                </p>
                <Image src={props.bookmark ? '/images/jobs/icons8-bookmark-90.svg' : "/images/jobs/icon.svg"} alt="Job Logo" width={20} height={20} onClick={() => handleBookmark(props.id)} className={props.isHome ? `hidden` : 'block'}/>
            </div>
            <div className="flex gap-6 max-md:flex-col">
                <Image src={`${process.env.NEXT_PUBLIC_API}/${props.logo}`} alt="Job Logo" width={100} height={100} unoptimized/>
                <div>
                    <p className="font-bold text-xl">{props.title}</p>
                    <p>{props.company}</p>
                </div>
            </div>
            <div className="flex w-full justify-between max-md:flex-col gap-2">
                <div className="flex gap-4 justify-around max-md:flex-col max-md:w-1/1 max-md:items-start">
                    <div className="flex gap-2 items-center justify-center">
                        <Image src="/images/jobs/briefcase(2) 2 (1).svg" alt="Category" width={20} height={20} />
                        <span className="text-gray-700">{props.category}</span>
                    </div>
                    <div className="flex gap-2  items-center justify-center">
                        <Image src="/images/jobs/clock.svg" alt="Time" width={20} height={20} />
                        <span className="text-gray-700">{props.type}</span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <Image src="/images/jobs/g135.svg" alt="Salary" width={20} height={20} />
                        <span className="text-gray-700">${props.salary}</span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <Image src="/images/jobs/map-pin.svg" alt="Location Icon" width={20} height={20} />
                        <span className="text-gray-700">{props.location}</span>
                    </div>
                </div>
                <a href={`/job/${props.id}`} className="p-2 bg-[#309689] rounded-lg text-white px-4 hover:scale-105 transition-all shadow-xl max-md:text-center max-md:mt-4">
                    Job Details
                </a>
            </div>
        </div>
    )
};