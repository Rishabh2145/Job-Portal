import { jobs } from "@/app/page"
import Job from "@/components/Job"

export default function Course() {
    return (
        <div className="m-6 px-4">
            {jobs.map((item, index) => (
                <Job key={index} time={item.time} logo={item.logo} title={item.title} company={item.company} category={item.category} type={item.type} salary={item.salary} location={item.location} />
            ))}
        </div>
    )
}