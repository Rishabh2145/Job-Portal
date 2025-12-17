import Image from "next/image";
import { redirect } from "next/navigation";
export default function Verify() {
    return (
        <main className="flex flex-col bg-white h-screen w-full justify-start text-black items-center">
            <a href="/" className="flex fixed items-center gap-2 mt-6">
                      <Image
                        src="/images/briefcase1.svg"
                        alt="Logo"
                        width={30}
                        height={30}
                      />
                      <p className="font-bold">MyJob</p>
                    </a>
            <div className="h-screen absolute w-1/4 flex flex-col items-center justify-center gap-4 ">
                <div className="text-[24px] font-bold mt-10">Reset Password</div>
                <div className="text-gray-600  text-center text-[14px]">Duis luctus interdum metus, ut consectetur ante consectetur sed. Suspendisse euismod viverra massa sit amet mollis.</div>
                <input
                    type="password"
                    placeholder="New Password"
                    className="border-1 border-solid border-gray-400 text-[14px] rounded-lg text-black-400 p-2 w-full pl-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border-1 border-solid border-gray-400 text-[14px] rounded-lg text-black-400 p-2 w-full pl-4"
                    required
                />
                <div className="flex bg-indigo-600 text-white justify-center text-center p-2 rounded-sm cursor-pointer hover:bg-indigo-700 w-full text-[14px]">
                    Reset Password <Image src="/images/fi_arrow-right.png" alt="Arrow Side" width={14} height={7} className="ml-2" />
                </div>
            </div>
        </main>
    );
}