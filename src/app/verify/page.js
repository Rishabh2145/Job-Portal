
import { redirect } from "next/navigation";
import Image from "next/image";
export default function Verify() {
    return (
        <main className="flex flex-col bg-white h-screen w-full justify-start text-black items-center">
            <a href="/" className="flex items-center gap-2 fixed mt-6">
                <Image
                    src="/images/briefcase1.svg"
                    alt="Logo"
                    width={30}
                    height={30}
                />
                <p className="font-bold">MyJob</p>
            </a>
            <div className="basis-1/1 w-1/4 flex flex-col items-center justify-center gap-4 max-md:w-9/10">
                <div className="text-[24px] font-bold mt-10">Email Verification</div>
                <div className="text-gray-600 mt-4 text-center text-[14px]">We've sent an verification to <span className="text-black">emailaddress@gmail.com</span> to verify your email address and activate your account.</div>
                <input
                    type="password"
                    placeholder="Verification Code"
                    className="border-1 border-solid border-gray-400 rounded-lg text-black-400 p-2 w-full pl-4"
                    required
                />
                <div className="flex bg-indigo-600 text-white justify-center text-center p-2 rounded-sm cursor-pointer hover:bg-indigo-700 w-full text-[14px]">
                    Verify My Account <Image src="/images/fi_arrow-right.png" alt="Arrow Side" width={14} height={7} className="ml-2" />
                </div>
                <p className="text-gray-600 text-[14px]">Didn't receive any code? <a href="#" className="text-indigo-500 font-bold">Resends</a></p>

            </div>
        </main>
    );
}