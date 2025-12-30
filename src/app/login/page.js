"use client";

import Image from "next/image";
import { useFormik } from "formik";
import navigate from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/api/login";
import { useSigninMutation } from "@/store/api/auth";

export default function Login() {
  const dispatch = useDispatch()
  const [signin, {isLoading}] = useSigninMutation()
  const cred = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    onSubmit: async (values , {resetForm}) => {
      try{
        const res = await signin(values).unwrap()
        console.log(res)
        alert("Logged In")
        resetForm()
      } catch(err){
        alert("Invalid Credentials")
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
          <p className="font-bold">MyJob</p>
        </a>
        <div className="w-full text-black flex flex-col items-center justify-center gap-4 ">
          <form method="POST" onSubmit={cred.handleSubmit} className="gap-4 flex flex-col text-[14px] w-2/3 max-md:w-9/10">
            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-[24px] font-bold">Sign In</div>
                <div className="text-[12px] text-gray-600 gap-1 flex">Don't have account?<a href="/signup" className="text-indigo-500 font-bold">Create Account</a></div>
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
                <a href="/forgot" className="text-indigo-500 text-sm">Forgot Password</a>
              </div>
            </div>
            <input type="submit" value='Sign In' href="/dashboard" className="flex bg-indigo-600 text-white justify-center text-center p-3 rounded-sm cursor-pointer hover:bg-indigo-700" />

            <p className="self-center text-gray-500">or</p>
            <div className="flex gap-2 text-gray-700 max-md:flex-col">
              <div className="flex basis-1/2 items-center justify-center gap-2 border-1 border-gray-300 border-solid rounded-lg p-2 cursor-pointer hover:bg-gray-100">
                <Image
                  src="/images/Vector.svg"
                  alt="Facebook Sign Up"
                  width={10}
                  height={10}
                />
                <span> Sign up with Facebook</span>
              </div>
              <div className="flex basis-1/2 items-center justify-center gap-2 border-1 border-gray-300 border-solid rounded-lg p-2 cursor-pointer hover:bg-gray-100">
                <Image
                  src="/images/Employers Logo.svg"
                  alt="Google Sign Up"
                  width={20}
                  height={20}
                />
                <span> Sign up with Google</span>
              </div>
            </div>

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
    </main>
  );
}