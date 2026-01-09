// "use client"

// import { handleError, handleSuccess } from "@/app/utils"
// import { useVerifyMutation } from "@/store/api/auth"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Suspense } from "react"

// export default function VerifyPage() {
//     const [verify, { isLoading }] = useVerifyMutation()
//     const searchParams = useSearchParams()
//     const router = useRouter()
//     const handleClick = async () => {
//         const cred = {
//             email: searchParams.get('email'),
//             token: searchParams.get('token')
//         }
//         try {
//             await verify(cred).unwrap().then(() => {
//                 handleSuccess("Account verified successfully!");
//                 router.replace('/auth/login')
//             })
//         } catch (err) {
//             handleError(err.data?.message);
//             console.log(err)
//         }
//     }
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <main className="flex h-full w-full items-center justify-center">
//                 <button className="bg-white text-black p-4 rounded-xl" onClick={handleClick} disabled={isLoading}>{isLoading ? 'Loading...' : 'Verify Account!'}</button>
//             </main>
//         </Suspense>
//     )
// }

import { Suspense } from "react";
import VerifyPage from "./Verify";

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyPage />
    </Suspense>
  )
}
