"use client"
import { handleError, handleSuccess } from "@/app/utils"
import { useGetAboutQuery, useUpdateAboutMutation } from "@/store/api/contact"
import { useFormik } from "formik"

export default function Edit() {
    const [updates, { isLoading }] = useUpdateAboutMutation()
    const about = useGetAboutQuery()?.data?.data
    const updateForm = useFormik({
        initialValues: {
            call: about?.call || '',
            email: about?.email || '',
            hours: about?.hours || '',
            address: about?.address || '',
        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await updates(values).unwrap()
                handleSuccess(res.message)
                resetForm()
            } catch (err) {
                handleError("Unable to update!")
                console.log(err)
            }
        }
    })
    return (
        <main className="bg-white p-8 m-4 flex flex-col gap-8 rounded-xl">
            <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold text-center">Office Details</h1>
                <p>Edit the details of the office for the about page.</p>
            </div>
            <form onSubmit={updateForm.handleSubmit} className="flex grid grid-cols-4 items-center justify-center gap-4 max-md:grid-cols-1">
                <label htmlFor="call" className="self-center justify-self-center font-bold">Phone Number: </label>
                <input
                    type="text"
                    name="call"
                    id="call"
                    value={updateForm.values.call}
                    onChange={updateForm.handleChange}
                    placeholder="+123 456 789"
                    pattern="^(?:\+91[-\s]?|91[-\s]?|0[-\s]?)?[6-9]\d{9}$"
                    className="border border-gray-500 rounded-lg p-2"
                    required
                />
                <label htmlFor="email" className="self-center justify-self-center font-bold">Email Address: </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={updateForm.values.email}
                    onChange={updateForm.handleChange}
                    placeholder="sample@example.com"
                    className="border border-gray-500 rounded-lg p-2"
                    required
                />
                <label htmlFor="hours" className="self-center justify-self-center font-bold">Working Hours: </label>
                <input
                    type="text"
                    name="hours"
                    id="hours"
                    value={updateForm.values.hours}
                    onChange={updateForm.handleChange}
                    placeholder="Mon-Fri: 10:00 AM - 6:00 PM"
                    className="border border-gray-500 rounded-lg p-2"
                    required
                />
                <label htmlFor="address" className="self-center justify-self-center font-bold">Office Address: </label>
                <textarea
                    name="address"
                    id="address"
                    value={updateForm.values.address}
                    onChange={updateForm.handleChange}
                    placeholder="123 Gomti Street Lucknow India"
                    className="border border-gray-500 rounded-lg p-2"
                    required
                />
                <button type="submit" className="col-span-4 buttonColor w-fit justify-self-center p-2 px-4 max-md:col-span-2" disabled={isLoading}>
                    {isLoading ? "Loading..." : 'Submit'}
                </button>
            </form>
        </main>
    )
}