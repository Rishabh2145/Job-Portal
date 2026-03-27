"use client";

import Image from "next/image";
import { useFormik } from "formik";
import {  useLoginMutation } from "@/store/api/baseApi";
import { useCheckVerificationMutation, useSigninMutation } from "@/store/api/auth";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleError, handleSuccess } from "../../utils";

export default function Login() {

  const router = useRouter()
  const [signin, { isLoading }] = useLoginMutation()
  const [user] = useCheckVerificationMutation()

  const cred = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const validity = await user(values).unwrap()
        try {
          const res = await signin(values).unwrap()
          localStorage.setItem('token', res.token)
          handleSuccess("User Logged In! Redirecting to Dashboard")
          router.replace('/dashboard')
        } catch (err) {
          handleError(err.data.message)
          console.log(err)
        }
      } catch (err) {
        handleError(err?.data?.message)
        console.log(err)
      }

    }
  })



  return (
    <main className="flex bg-white">
      <div className="h-screen basis-1/2 w-2/3 max-md:basis-1/1 flex flex-col justify-between items-center">
        <a href="/" className="flex items-center gap-2 w-2/3 mt-5 max-md:w-9/10 text-black ">
          <Image
            src="/images/briefcase1.svg"
            alt="Logo"
            width={30}
            height={30}
          />
          <p className="font-bold">HireHub</p>
        </a>
        <div className="w-full text-black flex flex-col items-center justify-center gap-4 ">
          <form method="POST" onSubmit={cred.handleSubmit} className="gap-4 flex flex-col text-[14px] w-2/3 max-md:w-9/10">
            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-[24px] font-bold">Sign In</div>
                <div className="text-[12px] text-gray-600 gap-1 flex">Don't have account?<a href="/auth/signup" className="text-indigo-500 font-bold">Create Account</a></div>
              </div>
            </div>

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={cred.handleChange}
              className="border-1 border-solid border-gray-400 rounded-lg text-black-400 p-2"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={cred.handleChange}
              className="border-1 border-solid border-gray-400 rounded-lg text-black-400 p-2"
            />

            <div className="flex">
              <input type="checkbox" className="mr-2" />
              <div className="flex justify-between w-full">
                <span className="text-gray-500 text-sm">Remember me</span>
                <a href="/auth/forgot" className="text-indigo-500 text-sm">Forgot Password</a>
              </div>
            </div>
            <input type="submit" disabled={isLoading} value={isLoading ? " Loading ..." : 'Sign In'} href="/dashboard" className="flex bg-indigo-600 text-white justify-center text-center p-3 rounded-sm cursor-pointer hover:bg-indigo-700" />

            

          </form>
        </div>
        <br />
      </div>


      <div className="flex bg-[url('/images/bglogin.png')] bg-cover h-screen basis-1/2 max-md:hidden" style={{
        clipPath: "polygon(2% 0, 100% 0, 100% 100%, 0 100%)"
      }}>
        <div className="w-full h-full bg-gradient-to-b from-[#041A3C80] to-[#041A3C] justify-end items-center flex flex-col text-white gap-6">
          <div className="h-1/2 w-1/2 flex flex-col gap-6 justify-center">
            <div className="text-[28px]">Over 1,75,324 Candidates waiting for good employee.</div>
            <div className="flex justify-between">
              <div className="flex flex-col justify-center">
                <Image
                  src="/images/briefcase-duotone 1 (1).svg"
                  alt="Quote"
                  width={50}
                  height={50}
                  className="bg-gray-700 rounded-lg p-2 mb-4"
                />
                <span className="text-[14px]">1,75,324</span>
                <span className="text-[12px] text-gray-300">Live Job</span>
              </div>
              <div className="flex flex-col justify-center">
                <Image
                  src="/images/buildings-duotone 1.svg"
                  alt="Quote"
                  width={50}
                  height={50}
                  className="bg-gray-700 rounded-lg p-2 mb-4"
                />
                <span className="text-[14px]">97,354</span>
                <span className="text-[12px] text-gray-300">Companies</span>
              </div>
              <div className="flex flex-col justify-center">
                <Image
                  src="/images/briefcase-duotone 1 (1).svg"
                  alt="Quote"
                  width={50}
                  height={50}
                  className="bg-gray-700 rounded-lg p-2 mb-4"
                />
                <span className="text-[14px]">7,532</span>
                <span className="text-[12px] text-gray-300">New Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}