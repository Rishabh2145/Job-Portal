"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const theme = {
    light: { img: '/images/jobs/briefcase(2) 2 (1).svg' },
    dark: { img: "/images/home/check(1) 1.svg" }
}

export default function Header(props) {
    
    return (
        <div className="flex justify-between p-6 w-4/5 items-center max-md:w-full">
            <div className="flex items-center gap-2 cursor-pointer justify-center">
                <Image
                    src={props.theme == 'dark' ? theme.dark.img : theme.light.img}
                    alt="Logo"
                    width={30}
                    height={30}
                />
                <span className={`font-bold ml-2 text-lg ${props.theme == 'dark' ? "text-white" : "text-black"}`}>Job <span className="max-md:hidden">Portal</span></span>
            </div>
            <div className={`flex gap-12 max-md:hidden ${props.theme == 'dark' ? "text-white/70" : "text-black/70"}`}>
                <a className={`hover:scale-105 transition-all ${props.page == 'home' ? "text-white" : "text-white/70"}`} href="/">Home</a>
                <a className={`hover:scale-105 transition-all ${props.page == 'job' ? "text-white" : "text-white/70"}`} href="/job">Jobs</a>
                <a className={`hover:scale-105 transition-all ${props.page == 'about' ? "text-white" : "text-white/70"}`} href="/about">About Us</a>
                <a className={`hover:scale-105 transition-all ${props.page == 'contact' ? "text-white" : "text-white/70"}`} href="/contact">Contact Us</a>
            </div>
            <div className={`flex gap-6 items-center `}>
                <a href="/login" className={`hover:scale-105 transition-all ${props.theme == 'dark' ? "text-white/70" : "text-black/70"}`}>Login</a>
                <a className="bg-[#309689] p-2 rounded-lg px-4 hover:scale-105 transition-all text-white" href="/signup">Register</a>
            </div>
        </div>
    )
}

export function MenuExpand() {
    document.getElementById('menu').onclick = () => {
        document.getElementById('sidebar').classList.toggle('hidden')
    }
}

export function Dashboard() {
    const router = useRouter()
    return (
        <div className='flex justify-between gap-5 sticky top-2 backdrop-blur-sm bg-white/5 z-100 m-2 rounded-full p-4 shadow-sm'>

            <input
                type='text'
                placeholder='Search your job'
                className='border rounded-full px-5 border-gray-500/50 w-full bg-white/70'
            />
            <p className='border-l border-gray-500' />
            <div className='flex justify-center items-center gap-4 ml-5'>
                <Image
                    src='/images/review/Avatar.svg'
                    alt='Profile'
                    height={45}
                    width={45}
                />
                <h2 className='w-fit min-w-38 max-w-38 flex gap-4 cursor-pointer truncate max-md:min-w-0'><details className='dropdown'>
                    <summary className='font-bold'><span className='max-md:hidden'>Rishabh Kumar</span></summary>
                    <div className='absolute flex flex-col justify-center rounded-3xl shadow-xl bg-white mt-7 p-2'>
                        <a href='/dashboard/profile' className='w-32 flex justify-center h-10 items-center'>My Profile</a>
                        <a href='/dashboard/contact' className='w-32 flex justify-center h-10 items-center'>Contacts</a>
                        <button className="w-32 flex justify-center h-10 items-center" onClick={
                            () => {
                                localStorage.removeItem('token')
                                localStorage.removeItem('user')
                                router.push('/login')
                            }
                        }>
                            Logout
                        </button>
                    </div>
                </details></h2>


            </div>
        </div>
    )
}