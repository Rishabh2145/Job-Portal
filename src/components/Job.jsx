import Image from "next/image";

export default function Job(props) {
    return (
        <div className="flex flex-col justify-between mt-8 gap-6 shadow-lg p-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all cursor-pointer ">
            <div className="flex w-full justify-between">
                <p className="bg-[#309689]/20 text-[#309689] px-2 py-1 rounded-lg text-sm">
                    {props.time} min ago
                </p>
                <Image src="/images/jobs/icon.svg" alt="Job Logo" width={20} height={20} />
            </div>
            <div className="flex gap-6 max-md:flex-col">
                <Image src={`/images/jobs/${props.logo}`} alt="Job Logo" width={50} height={50} />
                <div>
                    <p className="font-bold text-xl">{props.title}</p>
                    <p>{props.company}</p>
                </div>
            </div>
            <div className="flex w-full justify-between max-md:flex-col gap-2">
                <div className="flex gap-4 w-1/2 justify-around max-md:flex-col max-md:w-1/1 max-md:items-start">
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
                        <span className="text-gray-700">{props.salary}</span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <Image src="/images/jobs/map-pin.svg" alt="Location Icon" width={20} height={20} />
                        <span className="text-gray-700">{props.location}</span>
                    </div>
                </div>
                <a href="/job" className="p-2 bg-[#309689] rounded-lg text-white px-4 hover:scale-105 transition-all shadow-xl max-md:text-center max-md:mt-4">
                    Job Details
                </a>
            </div>
        </div>
    )
};