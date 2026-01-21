"use client"
import { useLazyFilterQuery } from '@/store/api/job'
import { useUserQuery } from '@/store/api/user'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSearchParams , usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const theme = {
    light: { img: '/images/jobs/briefcase(2) 2 (1).svg' },
    dark: { img: "/images/home/check(1) 1.svg" }
}

export default function Header(props) {
    const user = useUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    console.log(user)
    const router = useRouter()
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
                <a className={`hover:scale-105 transition-all ${props.page == 'contact' ? "text-white" : "text-white/70"} `} href="/contact">Contact Us</a>
            </div>
            <div className={`flex gap-6 items-center `}>
                {(!user?.data?.user ) ? <><a href="/auth/login" className={`hover:scale-105 transition-all ${props.theme == 'dark' ? "text-white/70" : "text-black/70"}`}>Login</a>
                    <a className="bg-[#309689] p-2 rounded-lg px-4 hover:scale-105 transition-all text-white" href="/auth/signup">Register</a> </> : <div className={`flex justify-center items-center gap-4  ${props.theme == 'dark' ? "text-white" : "text-black"}`}>

                    <a href='/dashboard'>Dashboard</a>
                    <button className={`bg-[#309689] p-2 rounded-lg px-4 hover:scale-105 transition-all text-white`} onClick={
                        () => {
                            router.replace('/logout')
                        }
                    }>Logout</button></div>}
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
    const [filterJob, { isLoading, data }] = useLazyFilterQuery(
        undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const user = useUserQuery()
    const searchParams = useSearchParams()
    const path = usePathname()
    const queryParams = {
        job: searchParams.get('job') || null,
        category: searchParams.get('category') || null,
        type: searchParams.get('type') || null,
        experience: searchParams.get('experience') || null,
        dates: searchParams.get('dates') || null,
        salary: Number(searchParams.get('salary')) || 0,
        location: searchParams.get('location') || null,
        page: Number(searchParams.get('pages')) || 1
    }
    useEffect(() => {
        filterJob(queryParams)
    }, [searchParams])
    const router = useRouter()
    const [search, setSearch] = useState(false)
    const [onTab, setTab] = useState(false)
    const name = user?.data?.user?.fullName
    const toggleSearch = () => setSearch(!search)

    return (
        <div className='relative flex justify-between gap-5 sticky top-2 backdrop-blur-sm bg-white/5 z-100 m-2 rounded-xl p-4 shadow-sm '>
            <div className=' w-full flex flex-col gap'>
                <input
                    type='text'
                    placeholder='Search your job'
                    onFocusCapture={toggleSearch}
                    onBlur={toggleSearch}
                    className=' relative border h-12 rounded-xl px-5 border-gray-500/50 w-full bg-white/70'
                    value={queryParams?.job || ''}
                    onChange={(e) => {
                        const params = new URLSearchParams();
                        const job = params.get('job')
                        if (job) {
                            params.delete('job')
                        }
                        params.set('job', e.target.value)
                        if (e.target.value.length === 0) {
                            params.delete('job')
                        }
                        router.replace(`${path}?${params.toString()}`, { scroll: false })
                    }}
                />
                <div className={`absolute top-16 flex flex-col p-4 left-0 bg-white w-full gap-6 mt-6 rounded-lg mr-4 overflow-hidden ${(search) ? 'block' : 'hidden'}`}>
                    {data && data?.jobs.slice(0,5).map((items, index) => (
                        <div className='flex justify-between items-center cursor-pointer' key={index} onMouseDown={() => router.push(`/job/${items._id}`)}>
                            <a className='text-xl flex gap-4 items-center font-bold'>{items.title}</a>
                            <a className='text-blue-700 underline'>Check Job</a>
                        </div>
                    ))}
                </div>
            </div>
            <p className='border-l border-gray-500' />
            <div className='flex justify-center items-center gap-4 ml-5'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_API}/${user?.data?.user?.avatar}`}
                    alt='Profile'
                    height={45}
                    width={45}
                    unoptimized
                />
                <h2 className='w-fit min-w-38 max-w-38 flex gap-4 cursor-pointer truncate max-md:min-w-0'><details className='dropdown'>
                    <summary className='font-bold truncate'><span className='max-md:hidden truncate'>{name ? `${name}` : 'Guest'}</span></summary>
                    <div className='absolute flex flex-col justify-center rounded-3xl shadow-xl bg-white mt-7 p-2'>
                        <a href='/dashboard/profile' className='w-32 flex justify-center h-10 items-center cursor-pointer'>My Profile</a>
                        <a href='/dashboard/contact' className={`w-32 flex justify-center h-10 items-center cursor-pointer ${user?.data?.user?.role === 'Admin' ? `block` : 'hidden'}`}>Contacts</a>
                        <button className="w-32 flex justify-center h-10 items-center cursor-pointer" onClick={
                            () => {
                                router.replace('/logout')
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