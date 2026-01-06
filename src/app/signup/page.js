"use client"
import Image from "next/image";
import { useFormik } from "formik";
import { useSignupMutation } from "@/store/api/auth";
import { extractInfo, handleSuccess, handleError } from "../utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserQuery } from "@/store/api/user";


export default function HomePage() {
  const router = useRouter()
  const user = useUserQuery()

  useEffect(() => {
    if (!user?.data) {
      handleError("Already Logged In!")
      router.replace('/dashboard')
    }
  }, [router])

  const [signup, { isLoading }] = useSignupMutation()
  const details = useFormik({
    initialValues: {
      role: "Candidate",
      fullName: "",
      username: "",
      email: "",
      password: ""
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await signup(values).unwrap()
        handleSuccess("Signup Success! Please login with same credentials.")
        extractInfo(res)
        resetForm()
        router.replace('/login')
      } catch (err) {
        handleError("Signup failed!")
        console.log(err)
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <main className="flex bg-white">
      <div className="h-screen w-full basis-1/2 flex flex-col items-center justify-between text-black max-md:basis-1/1 ">
        <a href="/" className="flex items-center gap-2 w-2/3 m-4">
          <Image
            src="/images/briefcase1.svg"
            alt="Logo"
            width={30}
            height={30}
          />
          <p className="font-bold">MyJob</p>
        </a>

        <div className="max-h-screen text-black flex flex-col items-start justify-center gap-4 max-md:basis-1/1 w-2/3">

          <form action='/verify' onSubmit={details.handleSubmit} className="gap-4 flex flex-col text-[14px] w-1/1">
            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-[24px] max-md:text-lg font-bold">Create account.</div>
                <div className="text-[12px] text-gray-600">Already have an account? <a href="/login" className="text-indigo-500 font-bold">Log in</a></div>
              </div>
              <div className="border-1 border-solid rounded-lg p-2 border-gray-400 text-gray-700 flex">
                <select id="user" name="role" onChange={details.handleChange}>
                  <option value="Candidate">Candidate</option>
                  <option value="Employee">Employer</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 max-md:flex-col max-md:text-black">
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                onChange={details.handleChange}
                className="basis-1/2 border-1 border-solid border-gray-400 rounded-lg text-black-400 p-2"
                required
              />
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={details.handleChange}
                className="basis-1/2 border-1 border-solid border-gray-400 rounded-lg text-black-400 p-2"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={details.handleChange}
              className="border-1 border-solid border-gray-400 rounded-lg text-black-400 p-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={details.handleChange}
              className="border-1 border-solid border-gray-400 rounded-lg text-black-400 p-2"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirm"
              className="border-1 border-solid border-gray-400 rounded-lg text-black-400 p-2"

              required
            />
            <div className="flex">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-500 text-sm">I've read and agree with your <span className="text-indigo-500 ">Terms of Service</span></span>
            </div>
            <input type="submit" id='signup' value='Create Account' className="flex bg-indigo-600 text-white justify-center text-center p-3 rounded-sm cursor-pointer hover:bg-indigo-700" />
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