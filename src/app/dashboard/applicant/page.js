"use client"
import { handleError, handleSuccess } from "@/app/utils"
import { useGetApplicantQuery, useUpdateStatusMutation } from "@/store/api/job"
import { useRouter } from "next/navigation"
import Popup from "reactjs-popup"
import Image from "next/image"
import moment from "moment"
export default function Applicant() {
    const applicants = useGetApplicantQuery()
    const [updateStatus, { isLoading }] = useUpdateStatusMutation()

    const handleStatusChange = async (id, jobId, status) => {
        try {
            const values = {
                id,
                jobId,
                status
            }
            const check = confirm(`You are updating the Status of Application to ${status}. Are you sure you want to update?`)
            if (check) {
                const res = await updateStatus(values).unwrap();
                handleSuccess(res.message)
            }
        } catch (err) {
            console.log(err);
            handleError(err?.data?.message)
        }
    }
    const job = applicants?.data?.jobs || [];
    const jobs = [...job].reverse()
    const router = useRouter();

    return (
        <main className="bg-white m-4 p-6 rounded-xl flex flex-col gap-4">
            <div className="text-3xl font-bold text-center mb-6">Candidates Applied</div>
            {jobs ? jobs.map((item, index) => (
                <div className="border border-gray-500 rounded-lg p-6 max-md:p-4" key={index}>
                    <div className="flex justify-between items-center px-4 ">
                        <div className="flex min-md:items-center min-md:gap-4 max-md:justify-center max-md:flex-col">
                            <p className="font-bold text-xl max-md:text-lg">{item.title}</p>
                            <p className="text-sm w-fit buttonColor p-1 max-md:bg-white max-md:text-black max-md:text-xs">{moment(item.createdAt).fromNow()}</p>
                        </div>
                        <button className="bg-blue-500/90 text-white rounded-lg p-2 px-4" onClick={() => router.push(`/job/${item._id}`)}>Details</button>
                    </div>
                    <div className="mt-8 flex min-md:flex-col gap-4 px-4 max-md:grid max-md:grid-cols-3 ">
                        <div className="grid grid-cols-5 text-center font-bold flex justify-between max-md:grid-cols-1 ">
                            <p>Name</p>
                            <p>Email</p>
                            <p>Profile</p>
                            <p>Status</p>
                            <p>Action</p>
                        </div>
                        {item ? item.Applied.map((applicant, ind) => (
                            <div className="grid grid-cols-5 min-md:text-center flex justify-between items-center max-md:grid-cols-1" key={ind}>
                                
                                <p>{applicant ? applicant.Applicants[0].fullName : ''}</p>
                                <p>{applicant ? applicant.Applicants[0].email : ''}</p>
                                {<Popup trigger={<a className="text-blue-700 underline cursor-pointer">View Profile</a>}
                                    position='right center'
                                    modal nested className="text-black rounded-lg bg-white shadow-lg">
                                    {close => (
                                        <div className="text-black bg-white p-4 rounded-lg shadow-lg w-screen/2 overflow-y-auto max-h-[80vh]">
                                            <div className="flex justify-between p-4 items-center">
                                                <h1 className="text-xl font-bold">Candidate Profile</h1>
                                                <button className="text-black text-2xl" onClick={close}>
                                                    &times;
                                                </button>
                                            </div>
                                            <div className="p-4 flex flex-col gap-6">
                                                <div className="flex items-center gap-6 justify-between max-md:flex-col">
                                                    <div className="flex items-center gap-4">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_API}/${applicant?.Applicants[0]?.avatar}`}
                                                            alt='profile'
                                                            height={100}
                                                            width={100}
                                                            unoptimized
                                                            className=""
                                                        />
                                                        <div>
                                                            <p className="font-bold">{applicant.Applicants[0].fullName}</p>
                                                            <a href={`mailto:${applicant.Applicants[0].email}`} className=''>{applicant.Applicants[0].email}</a>
                                                        </div>
                                                    </div>
                                                    {applicant?.resume ? <a className="underline text-blue-700" target='_blank' href={`${process.env.NEXT_PUBLIC_API}/${applicant?.resume}`}>View Resume</a> : <p>No Resume Uploaded</p>}
                                                </div>
                                                <div className="grid grid-cols-6 flex items-center gap-4 mt-4 max-md:grid-cols-1">
                                                    <p className="font-bold">Contact:</p>
                                                    <a className="col-span-2 max-md:col-span-1 max-md:truncate" href={`tel:${applicant.Applicants[0].contact}`}>{applicant.Applicants[0].contact}</a>
                                                    <p className="font-bold">Mobile:</p>
                                                    <a className="col-span-2 max-md:col-span-1 max-md:truncate" href={`tel:${applicant.Applicants[0].mobile}`}>{applicant.Applicants[0].mobile}</a>
                                                    <p className="font-bold">Institute:</p>
                                                    <p className="col-span-2 max-md:col-span-1 max-md:truncate">{applicant.Applicants[0].institute}</p>
                                                    <p className="font-bold">Institute Grade:</p>
                                                    <p className="col-span-2 max-md:col-span-1 max-md:truncate">{applicant.Applicants[0].instituteGrade}</p>
                                                    <p className="font-bold">School:</p>
                                                    <p className="col-span-2 max-md:col-span-1 max-md:truncate">{applicant.Applicants[0].school}</p>
                                                    <p className="font-bold">School Grade:</p>
                                                    <p className="col-span-2 max-md:col-span-1 max-md:truncate">{applicant.Applicants[0].schoolGrade}</p>
                                                    <p className="font-bold">Address:</p>
                                                    <p className="col-span-5 max-md:col-span-1 max-md:truncate">{applicant.Applicants[0].address}</p>
                                                    <p className="font-bold ">Why should we hire?:</p>
                                                    <p className="col-span-5 max-md:col-span-1 max-md:truncate">{applicant.ques}</p>
                                                </div>
                                                <button className="bg-red-500 cursor-pointer text-white w-fit justify-self-center self-center p-2 px-4 rounded-lg" onClick={() => close()}>Close</button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>}
                                <p>{isLoading ? 'Loading...' : applicant ? applicant.status : ''}</p>
                                <div>
                                    <select className="p-2" name="status" id="status" value={applicant.status} onChange={(e) => handleStatusChange(applicant.Applicants[0]._id, item._id, e.target.value)} >
                                        <option value='Pending'>Pending</option>
                                        <option value='Selected'>Selected</option>
                                        <option value='Not Selected'>Not Selected</option>
                                        <option value='Inactive'>Inactive</option>
                                        <option value='Hold'>Hold</option>
                                    </select>
                                </div>
                            </div>
                        )) : <>Loading...</>}
                    </div>
                </div>
            )) : <h1>Loading...</h1>}

        </main>
    )
}