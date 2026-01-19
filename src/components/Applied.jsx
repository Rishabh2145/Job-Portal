import Image from "next/image"
export default function AppliedJob(props) {

    return (
        <div className="flex flex-col justify-between mt-8 gap-6 shadow-lg p-6 rounded-xl hover:shadow-xl hover:scale-102 transition-all cursor-pointer bg-white w-full">

            <div className="flex gap-6 justify-between max-md:flex-col">
                <div className="flex gap-6 items-center max-md:flex-col">
                    <Image src={`${process.env.NEXT_PUBLIC_API}/${props.companyImage}`} alt="Job Logo" width={100} height={100} unoptimized />
                    <div>
                        <p className="font-bold text-xl">{props.title}</p>
                        <p>{props.company}</p>
                    </div>
                </div>
                <div className="mr-4 flex items-center gap-2">
                    <p className="text-lg font-bold">Status:</p>
                    <p>{props.status}</p>
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
                        <span className="text-gray-700">{props.jobType}</span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <Image src="/images/jobs/g135.svg" alt="Salary" width={20} height={20} />
                        <span className="text-gray-700">{props.salary}</span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <Image src="/images/jobs/map-pin.svg" alt="Location Icon" width={20} height={20} />
                        <span className="text-gray-700">{props.location}</span>
                    </div>
                </div>
                <a href={`/job/${props._id}`} className="p-2 bg-[#309689] rounded-lg text-white px-4 hover:scale-105 transition-all shadow-xl max-md:text-center max-md:mt-4">
                    Job Details
                </a>
            </div>
        </div>
    )
}