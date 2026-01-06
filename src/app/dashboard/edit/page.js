'use client'
import { handleError, handleSuccess, profileValidation } from "@/app/utils"
import { useEditUserMutation, useUserQuery } from "@/store/api/user"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"

export let details = {}

export default function Edit() {
    const user = useUserQuery()
    const router = useRouter()
    const [mutation, { isLoading }] = useEditUserMutation()

    const userData = user?.data?.user?.user
    const editForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: userData?._id,
            fullName: userData?.fullName ?? '',
            email: userData?.email ?? '',
            contact: userData?.contact ?? '',
            mobile: userData?.mobile ?? '',
            institute: userData?.institute ?? '',
            instituteGrade: userData?.instituteGrade ?? '',
            school: userData?.school ?? '',
            schoolGrade: userData?.schoolGrade ?? '',
            address: userData?.address ?? ''
        },
        validationSchema: profileValidation,
        enableReinitialize: true,
        onSubmit: async (values, {resetForm}) => {
            try {
                const res = await mutation(values).unwrap()
                handleSuccess("Details Updated successfully! Please Re-Login to Access Updated Details.")
                
            } catch (err) {
                handleError("Unable to process your request! Please try again later")
                console.log(err)
            }

        }
    })

    return (
        <main className="bg-white p-12 flex flex-col gap-8 m-4 rounded-xl">
            <h1 className="text-3xl font-bold">Edit My Profile</h1>
            <form onSubmit={editForm.handleSubmit} method="post" className="grid grid-cols-2 flex justify-center items-center gap-6 max-md:grid-cols-1">
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="fullName" className="flex items-center justify-end">Enter Full Name:</label>
                    <input id="fullName" name="fullName" type="text" onBlur={editForm.handleBlur} className="border rounded-md h-10 px-2" value={editForm.values.fullName} onChange={editForm.handleChange} />
                    {editForm.touched.fullName && editForm.errors.fullName && (
                        <p className="text-red-500 text-sm px-2 mx-2 col-span-2">{editForm.errors.fullName}</p>
                    )}
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="contact" className="flex items-center justify-end">Enter Contact Number:</label>
                    <input id="contact" name="contact" type="number" onBlur={editForm.handleBlur} className="border rounded-md h-10 px-2" value={editForm.values.contact} onChange={editForm.handleChange} />
                    {editForm.touched.contact && editForm.errors.contact && (
                        <p className="text-red-500 text-sm px-2 mx-2 grid-cols-2 flex items-center">{editForm.errors.contact}</p>
                    )}
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="email" className="flex items-center justify-end">Enter Email Address:</label>
                    <input id="email" name='email' type="email" className="border rounded-md h-10 px-2" onBlur={editForm.handleBlur} value={editForm.values.email} onChange={editForm.handleChange} />
                    {editForm.touched.email && editForm.errors.email && (
                        <p className="text-red-500 text-sm px-2 mx-2 col-span-2">{editForm.errors.email}</p>
                    )}
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="mobile" className="flex items-center justify-end">Enter Mobile Number:</label>
                    <input id="mobile" name="mobile" type="number" className="border rounded-md h-10 px-2" onBlur={editForm.handleBlur} value={editForm.values.mobile} onChange={editForm.handleChange} />
                    {editForm.errors.mobile && (
                        <p className="text-red-500 text-sm px-2 mx-2 col-span-2">{editForm.errors.mobile}</p>
                    )}
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="institute" className="flex items-center justify-end">Enter Institute Name:</label>
                    <input id="institute" name="institute" type="text" className="border rounded-md h-10 px-2" onBlur={editForm.handleBlur} value={editForm.values.institute} onChange={editForm.handleChange} />
                    {editForm.touched.institute && editForm.errors.institute && (
                        <p className="text-red-500 text-sm px-2 mx-2 col-span-2">{editForm.errors.institute}</p>
                    )}
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="instituteGrade" className="flex items-center justify-end">Enter Grade (CGPA/Percent):</label>
                    <input id="instituteGrade" name="instituteGrade" type="number" onBlur={editForm.handleBlur} className="border rounded-md h-10 px-2" value={editForm.values.instituteGrade} onChange={editForm.handleChange} />
                    {editForm.touched.instituteGrade && editForm.errors.instituteGrade && (
                        <p className="text-red-500 text-sm px-2 mx-2 col-span-2">{editForm.errors.instituteGrade}</p>
                    )}
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="school" className="flex items-center justify-end">Enter School Name:</label>
                    <input id="school" name="school" type="text" className="border rounded-md h-10 px-2" onBlur={editForm.handleBlur} value={editForm.values.school} onChange={editForm.handleChange} />
                    {editForm.touched.school && editForm.errors.school && (
                        <p className="text-red-500 text-sm px-2 mx-2 col-span-2">{editForm.errors.school}</p>
                    )}
                </div>
                <div className="flex w-full gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="sGrade" className="flex items-center justify-end">Enter Grade (CGPA/Percent):</label>
                    <input id="schoolGrade" name='schoolGrade' type="number" className="border rounded-md h-10 px-2" onBlur={editForm.handleBlur} value={editForm.values.schoolGrade} onChange={editForm.handleChange} />
                    {editForm.touched.schoolGrade && editForm.errors.schoolGrade && (
                        <p className="text-red-500 text-sm px-2 mx-2 col-span-2">{editForm.errors.schoolGrade}</p>
                    )}
                </div>
                <div className="flex w-full  gap-4 grid grid-cols-2 max-md:grid-cols-1">
                    <label htmlFor="address" className="flex items-center justify-end">Enter Address:</label>
                    <textarea id="address" name="address" type="text" className="border rounded-md h-10 px-2" onBlur={editForm.handleBlur} value={editForm.values.address} onChange={editForm.handleChange} />
                    {editForm.touched.address && editForm.errors.address && (
                        <p className="text-red-500 text-sm px-2 mx-2 col-span-2">{editForm.errors.address}</p>
                    )}
                </div>
                <br />
                <div className="flex gap-6 col-span-2 items-center justify-center">
                    <a href="/dashboard" className="border-red-500 border px-4 rounded-lg text-red-500 p-2 hover:bg-red-500 cursor-pointer hover:text-white transition-all">Discard</a>
                    <input type="submit" value="Save Details" className="border-green-500 border px-4 rounded-lg text-green-500 p-2 hover:bg-green-500 cursor-pointer hover:text-white transition-all" />
                </div>
            </form>
                <div className="px-4"><span className="text-red-900 font-bold">Declaration: </span>I hereby declare that the information provided above is true and correct to the best of my knowledge. In case of any false or misleading information, appropriate action may be taken against me.</div>
        </main>
    )
}
