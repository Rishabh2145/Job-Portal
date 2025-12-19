import Image from "next/image";
import Option from "./Menu";

const menu = [
    {name : 'Dashboard', link : ''},
    {name : 'My Profile', link : 'profile'},
    {name : 'Jobs Applied', link : 'job'},
    {name : 'Contact', link : 'contact'},
    {name : 'Logout', link : '../'},
]
export default function SideBar() {
    return (
        <div className="h-screen overflow-y-auto gap-5 flex flex-col p-5 px-7 py-8 shadow-lg">
            <a href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                <Image
                    src='/images/jobs/briefcase(2) 2 (1).svg'
                    alt="Logo"
                    width={30}
                    height={30}
                />
                <span className="font-bold ml-2 text-lg">Job Portal</span>
            </a>
            <div className="flex flex-col gap-2 mt-5">
                <p className="text-xs text-gray-500">Overview</p>
                {menu.map((item, index) => (
                    <Option key={index} name={item.name} link={item.link}/>
                ))}
            </div>
        </div>
    )
}