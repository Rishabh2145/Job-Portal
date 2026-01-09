// "use client"
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useFormik } from "formik";
// import { useResetMutation } from "@/store/api/auth";
// import { handleError, handleSuccess } from "@/app/utils";
// import { useState } from "react";
// import { Suspense } from "react";

// export default function Verify() {
//     const [reset, { isLoading }] = useResetMutation()
//     const searchParams = useSearchParams()
//     const router = useRouter()
//     const [confirm, setConfirm] = useState('')
//     const resetData = useFormik({
//         initialValues: {
//             email: searchParams.get('email'),
//             token: searchParams.get("token"),
//             password: ""
//         },
//         onSubmit: async (values) => {
//             try {
//                 const res = await reset(values).unwrap()
//                 handleSuccess(res.message)
//                 router.replace('/auth/login')
//             } catch (err) {
//                 console.log(err)
//                 handleError(err?.data?.message)
//             }
//         }
//     })

//     return (

//         <main className="flex flex-col bg-white h-screen w-full justify-start text-black items-center">
//             <a href="/" className="flex fixed items-center gap-2 mt-6">
//                 <Image
//                     src="/images/briefcase1.svg"
//                     alt="Logo"
//                     width={30}
//                     height={30}
//                 />
//                 <p className="font-bold">MyJob</p>
//             </a>
//             <form onSubmit={resetData.handleSubmit} className="h-screen absolute w-1/4 flex flex-col items-center justify-center gap-4 max-md:w-9/10">
//                 <div className="text-[24px] font-bold mt-10">Reset Password</div>
//                 <div className="text-gray-600  text-center text-[14px]">Duis luctus interdum metus, ut consectetur ante consectetur sed. Suspendisse euismod viverra massa sit amet mollis.</div>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={resetData.values.password}
//                     onChange={resetData.handleChange}
//                     placeholder="New Password"
//                     className="border-1 border-solid border-gray-400 text-[14px] rounded-lg text-black-400 p-2 w-full pl-4"
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     onChange={(e) => setConfirm(e.target.value)}
//                     className="border-1 border-solid border-gray-400 text-[14px] rounded-lg text-black-400 p-2 w-full pl-4"
//                     required
//                 />
//                 <button type="submit" className="flex bg-indigo-600 text-white justify-center text-center p-2 rounded-sm cursor-pointer hover:bg-indigo-700 w-full text-[14px]" disabled={isLoading || (confirm !== resetData.values.password)}>
//                     {isLoading ? "Loading..." : "Reset Password"} <Image src="/images/fi_arrow-right.png" alt="Arrow Side" width={14} height={7} className="ml-2" />
//                 </button>
//             </form>
//         </main>
//     );
// }

import { Suspense } from 'react'
import Verify from './Reset'

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <Verify />
    </Suspense>
  )
}
