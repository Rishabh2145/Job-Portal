"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { useUserQuery } from "@/store/api/user"
import { useAvatarMutation } from "@/store/api/upload"
import { handleError, handleSuccess } from "@/app/utils"

export default function Profile() {
    const [profileUpdate, { isLoading, isSuccess }] = useAvatarMutation()
    const [edit, setEdit] = useState(true);
    const toggleEdit = () => {
        setEdit(!edit);
    }
    const users = useUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    const profile = users?.data?.user?.user

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

    return (
        <main className="grid grid-cols-2 p-5 m-5 bg-white rounded-xl shadow-sm max-md:grid-cols-1">
            <div className="flex flex-col w-full p-4 justify-around">
                <h1 className="text-2xl font-bold mb-6">My Profile</h1>
                <table className="h-3/4 max-md:mt-4 min-h-72">
                    <tbody className="p-4 w-full">
                        <tr>
                            <th>Role: </th>
                            <td colSpan={3}>{profile?.role}</td>
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
            <div className="flex flex-col justify-center items-center gap-6 p-4">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API}/${users?.data?.user?.user?.avatar}`}
                    alt='Profile'
                    height={300}
                    width={300}
                    unoptimized
                />
                <form className={`flex gap-4 ${edit ? 'hidden' : 'block'}`} onSubmit={file.handleSubmit}>
                    <input type="file" accept="image/*" className={`border rounded-lg px-4 p-1 max-md:w-1/3`} id="avatar" name='avatar'
                        onChange={(e) => file.setFieldValue('avatar', e.target.files[0])} required />
                    <button type="submit" className="bg-green-400 text-white p-2 px-6 rounded-lg" disabled={isLoading || isSuccess}>{isLoading ? "Loading..." : "Submit"}</button>
                </form>
                <button className="h-12 flex border w-1/3 justify-center items-center rounded-xl border-gray-400 text-gray-700 cursor-pointer max-md:w-2/3" onClick={toggleEdit}>Edit Photo</button>
            </div>
        </main>
    )
}