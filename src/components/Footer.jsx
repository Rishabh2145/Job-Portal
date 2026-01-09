import Image from "next/image";
export default function Footer(){
    return (
        <div className="pt-12 bg-black w-screen flex flex-col justify-center items-center gap-6 text-white">
                <div className="flex justify-between w-6/7 max-md:flex-col max-md:items-center max-md:gap-8">
                    <div className="flex flex-col gap-5 basis-1/4 max-md:items-center">
                        <div className="flex gap-2 items-center">
                            <Image
                                src="/images/home/briefcase(2) 2.svg"
                                alt="breif"
                                height={25}
                                width={25}
                            />
                            <p className="font-bold text-white text-xl text-center">Job</p>
                        </div>
                        <h3 className="line-clamp-3 text-white font-bold max-md:text-center">
                            Quis enim pellentesque viverra tellus eget malesuada facilisis. Congue nibh vivamus aliquet nunc mauris dui nullam et.
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5 max-md:items-center">
                        <h2 className="font-bold text-xl">Company</h2>
                        <div className="flex flex-col cursor-pointer max-md:items-center">
                            <a href="/about">About Us</a>
                            <a href="/contact">Contact Us</a>
                            <a>Our Teams</a>
                            <a>Partners</a>
                            <a>For Candidates</a>
                            <a>For Employees</a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 max-md:items-center">
                        <h2 className="font-bold text-xl ">Job Categories</h2>
                        <div className="flex flex-col cursor-pointer max-md:items-center">
                            <a>Telecomunications</a>
                            <a>Hotels & Tourism</a>
                            <a>Construction</a>
                            <a>Education</a>
                            <a>Financial Services</a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-1/4 max-md:w-1/1">
                        <h2 className="font-bold text-xl">Newsletter</h2>
                        <div className="flex flex-col gap-4 ">
                            <p className="text-gray-400 text-sm">Eu nunc pretium vitae platea. Non netus elementum vulputate </p>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="border-1 border-solid border-gray-400 rounded-lg text-black-400 p-2 px-4"
                            />
                            <button className="bg-[#309689] p-2 py-3 rounded-xl cursor-pointer hover:scale-105 transition-all">Subscribe Now</button>
                        </div>
                    </div>
                </div>
                <div className="w-7/8 flex justify-between text-sm mt-4 max-md:flex-col-reverse max-md:items-center max-md:gap-2">
                    <p className="text-gray-500">
                        © Copyright Job Portal  2024. Designed by Figma.guru
                    </p>
                    <div className="flex gap-4 underline cursor-pointer">
                        <a>Privacy Policy</a>
                        <a>Terms & Conditions</a>
                    </div>
                </div>
                <div>

                </div>
            </div>
    )
}