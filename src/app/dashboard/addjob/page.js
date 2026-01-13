"use client"
import { handleError, handleSuccess } from "@/app/utils"
import { useAddjobMutation } from "@/store/api/job"
import { useUserQuery } from "@/store/api/user"
import { useFormik } from "formik"

export default function AddJob() {
    const user = useUserQuery()
    const [job, { isLoading }] = useAddjobMutation()
    const jobData = useFormik({
        initialValues: {
            companyImage: null,
            title: '',
            company: '',
            category: 'Agriculture',
            jobType: 'Full-Time',
            salary: '',
            location: '',
            description: '',
            degree: 'Bachelor',
            experience: '',
            responsibility: '',
            skill: '',
            addedBy: user?.data?.user?.user._id
        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData()
                Object.entries(values).forEach(([key, value]) => {
                    if (value !== null && value !== "") {
                        formData.append(key, value);
                    }
                });
                const res = await job(formData).unwrap()
                handleSuccess("Job Added Successfully!")
                resetForm()
            } catch (err) {
                console.log(err)
                handleError(err?.data?.message)
            }
        }
    })
    if (!user?.data) {
        return (<>Loading...</>)
    }
    if (user?.data?.user?.user?.role === 'Candidate') {
        return (<>Access Denied</>)
    }

    return (
        <div className="bg-white p-12 flex flex-col gap-8 m-4 rounded-xl items-center">
            <h1 className="text-3xl font-bold text-center">Add a Job</h1>
            <form onSubmit={jobData.handleSubmit} className="flex w-5/6 justify-center items-center gap-6 grid grid-cols-4">
                <p>Company Logo: </p>
                <input
                    type="file"
                    name='companyImage'
                    accept="image/*"
                    id="companyImage"
                    className="border rounded-md h-10 px-2 col-span-3 flex justify-center items-center"
                    onChange={(e) => jobData.setFieldValue('companyImage', e.target.files[0])}
                />
                <p>Job Title: </p>
                <input
                    name='title'
                    id="title"
                    placeholder="Enter Title of the Job"
                    className="border rounded-md h-10 px-2"
                    onChange={jobData.handleChange}
                    value={jobData.values.title}
                />
                <p>Company Name:</p>
                <input
                    name='company'
                    id="company"
                    placeholder="Enter the name of the company"
                    className="border rounded-md h-10 px-2"
                    onChange={jobData.handleChange}
                    value={jobData.values.company}
                />
                <p>Job Category: </p>
                <select name="category" id="category" className="border rounded-md h-10 px-2" onChange={jobData.handleChange} value={jobData.values.category}>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Media Production">Media Production</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Construction">Construction</option>
                    <option value="Hotels & Tourism">Hotels & Tourism</option>
                    <option value="Education">Education</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Transport">Transport</option>
                    <option value="Healthcare">Health Care</option>
                    <option value="Technology">Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                </select>
                <p>Job Type: </p>
                <select name="jobType" id="jobType" className="border rounded-md h-10 px-2" onChange={jobData.handleChange} value={jobData.values.jobType}>
                    <option value="Full-Time">Full-time</option>
                    <option value="Part-Time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Fixed-Price">Fixed-Price</option>
                </select>
                <p>Expected Salary: </p>
                <input
                    name='salary'
                    id="salary"
                    placeholder="Salary with Currency Symbol"
                    className="border rounded-md h-10 px-2"
                    onChange={jobData.handleChange}
                    value={jobData.values.salary}
                />
                <p>Company Location: </p>
                <input
                    name='location'
                    id="location"
                    placeholder="Enter the location of the company"
                    className="border rounded-md h-10 px-2"
                    onChange={jobData.handleChange}
                    value={jobData.values.location}
                />
                <p>Degree Required: </p>
                <input
                    name='degree'
                    id="degree"
                    placeholder="Degree required for job"
                    className="border rounded-md h-10 px-2"
                    onChange={jobData.handleChange}
                    value={jobData.values.degree}
                />
                <p>Experience Required: </p>
                <input
                    name='experience'
                    id="experience"
                    placeholder="Experience Requied for this job"
                    className="border rounded-md h-10 px-2"
                    onChange={jobData.handleChange}
                    value={jobData.values.experience}
                />
                <p>Job Description: </p>
                <textarea
                    name='description'
                    id="description"
                    placeholder="Enter Description of the Job"
                    className="border rounded-md h-10 px-2 col-span-3"
                    onChange={jobData.handleChange}
                    value={jobData.values.description}
                />
                <p>Key Responsibilities: </p>
                <textarea
                    name='responsibility'
                    id="responsibility"
                    placeholder="Enter Key Responsibility of the Job"
                    className="border rounded-md h-10 px-2 col-span-3"
                    onChange={jobData.handleChange}
                    value={jobData.values.responsibility}
                />
                <p>Skills Required: </p>
                <textarea
                    name='skill'
                    id="skill"
                    placeholder="Enter Skill Required of the Job"
                    className="border rounded-md h-10 px-2 col-span-3"
                    onChange={jobData.handleChange}
                    value={jobData.values.skill}
                />

                <div className="flex justify-center gap-6 w-full col-span-4">
                    <input type="submit" value="Add Job" className="border-green-500 border px-4 rounded-lg text-green-500 p-2 hover:bg-green-500 cursor-pointer hover:text-white transition-all" />
                    <button className="border-red-500 border px-4 rounded-lg text-red-500 p-2 hover:bg-red-500 cursor-pointer hover:text-white transition-all">Discard</button>
                </div>
            </form>
        </div>
    )
}