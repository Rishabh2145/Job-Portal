'use client'
import { useUserQuery } from "@/store/api/user"
import { useFormik } from "formik"
import { useReviewMutation } from "@/store/api/user"
import { handleError, handleSuccess } from "@/app/utils"

export default function Review(){
    const user = useUserQuery()
    const [review, {isLoading}] = useReviewMutation()
    const reviewForm = useFormik({
        initialValues: {
            name: user?.data?.user?.fullName ||'',
            email: user?.data?.user?.email || '',
            title : '',
            star: 5,
            desc : ''
        },
        enableReinitialize: true,
        onSubmit : async(values, {resetForm}) => {
            try{
                const res = await review(values).unwrap()
                handleSuccess(res.message)
                resetForm()
            } catch(err){
                handleError(err?.data?.message)
                console.log(err)
            }
        } 
    })
    
    return (
        <main className="bg-white m-4 p-6 py-8 rounded-xl">
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-3xl font-bold">What you says is matter to us.</h1>
                <p>We value your feedback! Please share your experience with our service</p>
            </div>
            <form onSubmit={reviewForm.handleSubmit} className="flex grid grid-cols-4 justify-between gap-8 text-center items-center mt-10">
                <label htmlFor="name" className="font-bold">Enter Name: </label>
                <input 
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    name="name"
                    className="border border-gray-500 rounded-lg p-2 "
                    required
                    disabled={true}
                    pattern="[A-Za-z/.]"
                    value={reviewForm.values.name}
                    onChange={reviewForm.handleChange}
                />
                <label htmlFor="star" className="font-bold">Rating: </label>
                <select name="star" id="star" className="p-3 border border-gray-500 rounded-lg" required onChange={reviewForm.handleChange} value={reviewForm.values.star}>
                    <option value={5}>5 star</option>
                    <option value={4}>4 star</option>
                    <option value={3}>3 star</option>
                    <option value={2}>2 star</option>
                    <option value={1}>1 star</option>
                    <option value={0}>0 star</option>
                </select>
                <label className="font-bold" htmlFor="title">Review Title: </label>
                <input 
                    type="text"
                    placeholder="Title of the Review (in short)"
                    id="title"
                    name="title"
                    value={reviewForm.values.title}
                    onChange={reviewForm.handleChange}
                    className="border border-gray-500 rounded-lg p-2 "
                    required
                />
                <label className="font-bold" htmlFor="email">Email Address: </label>
                <input 
                    type="email"
                    placeholder="Email Address of the User"
                    id="email"
                    name="email"
                    value={reviewForm.values.email}
                    onChange={reviewForm.handleChange}
                    disabled={true}
                    className="border border-gray-500 rounded-lg p-2 "
                    required
                />
                <label className="font-bold" htmlFor="desc">Review Description: </label>
                <textarea 
                    type="text"
                    placeholder="Tell us what you liked, what could be improved, or anything else you would like us to know."
                    id="desc"
                    name="desc"
                    value={reviewForm.values.desc}
                    onChange={reviewForm.handleChange}
                    className="border border-gray-500 rounded-lg p-2 col-span-3"
                    required
                />
                <button type="submit" className="buttonColor p-2 w-fit col-span-4 self-center justify-self-center cursor-pointer px-4">Submit Review</button>
            </form>
        </main>
    )
}