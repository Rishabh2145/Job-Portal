"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { useUserQuery } from "@/store/api/user"
import { useAvatarMutation, useResumeMutation } from "@/store/api/upload"
import { handleError, handleSuccess } from "@/app/utils"

export default function Profile() {
    const [profileUpdate, { isLoading, isSuccess }] = useAvatarMutation()
    const [resumeUpload, ] = useResumeMutation()
    const [edit, setEdit] = useState(true);
    const [editResume, setEditResume] = useState(true);
    const toggleEdit = () => {
        setEdit(!edit);
    }
    const toggleEditResume = () => {
        setEditResume(!editResume);
    }
    const users = useUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    
    const profile = users?.data?.user
    

    const file = useFormik({
        initialValues: {
            avatar: null
        },
        onSubmit: async (values, {resetForm}) => {
            try {
                const res = await profileUpdate(values.avatar).unwrap()
                handleSuccess(res.message)
                resetForm()
            } catch (err) {
                handleError(err.data.message)
                console.log(err)
            }
        }
    })

    const resume = useFormik({
        initialValues: {
            resume: null
        },
        onSubmit: async (values, {resetForm}) => {
            try {
                const res = await resumeUpload(values.resume).unwrap()
                handleSuccess(res.message)
                resetForm()
                toggleEditResume()
            } catch (err) {
                handleError(err.data.message)
                console.log(err)
            }
        }
    })

    return (
        <main className="grid grid-cols-2 flex p-5 m-5 bg-white rounded-xl shadow-sm max-md:grid-cols-1">
            <div className="flex flex-col w-full p-4 justify-around max-md:order-2">
                <h1 className="text-2xl font-bold mb-6">My Profile</h1>
                <table className="h-3/4 max-md:mt-4 min-h-72">
                    <tbody className="p-4 w-full">
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2">
                            <th>Role: </th>
                            <td className="col-span-3 max-md:col-span-1">{profile?.role}</td>
                        </tr>
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2">
                            <th>Name:</th>
                            <td>{profile?.fullName}</td>
                            <th>Contact:</th>
                            <td>{profile?.contact ? profile.contact : 'N/A'}</td>
                        </tr>
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>Email Address:</th>
                            <td>{profile?.email}</td>
                            <th>Mobile:</th>
                            <td>{profile?.mobile ? profile.mobile : 'N/A'}</td>
                        </tr>
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>College:</th>
                            <td>{profile?.institute ? profile.institute : 'N/A'}</td>
                            <th>Grade:</th>
                            <td>{profile?.instituteGrade ? profile.instituteGrade : 'N/A'}</td>
                        </tr>
                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>School:</th>
                            <td>{profile?.school ? profile.school : 'N/A'}</td>
                            <th>Grade:</th>
                            <td>{profile?.schoolGrade ? profile.schoolGrade : 'N/A'}</td>
                        </tr>

                        <tr className="max-md:grid max-md:grid-cols-2 max-md:gap-2 ">
                            <th>Address:</th>
                            <td colSpan={3}>{profile?.address ? profile.address : 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="w-full flex justify-center items-center">
                    <a href="/dashboard/edit" className="h-12 flex border w-1/3 justify-center items-center rounded-xl border-gray-400 text-gray-700 max-md:w-2/3 max-md:mt-4">Edit Profile</a>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 p-4 max-md:order-1">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API}/${users?.data?.user?.avatar}`}
                    alt='Profile'
                    height={300}
                    width={300}
                    unoptimized
                />
                <form className={`flex justify-center items-center gap-4 ${edit ? 'hidden' : 'block'}`} onSubmit={file.handleSubmit}>
                    <input type="file" accept="image/*" className={`border rounded-lg px-4 p-1 max-md:w-1/3`} id="avatar" name='avatar'
                        onChange={(e) => file.setFieldValue('avatar', e.target.files[0])} required />
                    <button type="submit" className="bg-green-400 text-white p-2 px-6 rounded-lg" disabled={isLoading || isSuccess}>{isLoading ? "Loading..." : "Submit"}</button>
                </form>
                <button className="h-12 flex border w-1/3 justify-center items-center rounded-xl border-gray-400 text-gray-700 cursor-pointer max-md:w-2/3" onClick={toggleEdit}>Edit Photo</button>
            </div>
            <div className="flex col-span-2 justify-between items-center w-full gap-6 p-4 max-md:col-span-1 max-md:order-3 max-md:flex-col">
                <h1 className="text-xl font-bold ">Resume Upload</h1>
                { users?.data?.user?.resume ? <a className="text-blue-700 underline cursor-pointer" href={`${process.env.NEXT_PUBLIC_API}/${users?.data?.user?.resume}`} target="_blank">View Resume</a> : <p>No resume uploaded</p>}
                <form className={`flex justify-center items-center gap-4 ${editResume ? 'hidden' : 'block'} `} onSubmit={resume.handleSubmit}>
                    <input type="file" accept=".pdf" className={`border rounded-lg px-4 p-1 max-md:w-1/3`} id="resume" name='resume'
                        onChange={(e) => resume.setFieldValue('resume', e.target.files[0])} required />
                    <button type="submit" className="bg-green-400 text-white p-2 px-6 rounded-lg max-w-fit" disabled={isLoading || isSuccess}>{isLoading ? "Loading..." : "Submit"}</button>
                </form>
                <button className="h-12 flex border w-1/3 justify-center items-center rounded-xl border-gray-400 text-gray-700 cursor-pointer max-md:w-2/3" onClick={toggleEditResume}>Upload Resume</button>
            </div>
        </main>
    )
}