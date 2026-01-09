"use client"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import News from "@/components/News"
import { newsBlog } from "../page"
import Image from "next/image"
import Cards from "./Cards"
import FAQ from "./FAQ"

const works = [
    { logo: '/Clip path group.svg', title: 'Create Account', desc: 'Nunc sed a nisl purus. Nibh dis faucibus proin lacus ' },
    { logo: '/Group.svg', title: 'Upload Resume', desc: 'Felis eu ultrices a sed massa. Commodo fringilla sed tempor ' },
    { logo: '/briefcase(3) 1.svg', title: 'Find Jobs', desc: ' Commodo fringilla sed tempor risus laoreet ultricies ipsum' },
    { logo: '/check-mark 1.svg', title: 'Apply Job', desc: ' Nisi enim feugiat enim volutpat. Sem quis viverra ' }
]

const faq = [
    {index: 1, ques: 'Can I Upload a CV?', ans: 'Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc'},
    {index: 2, ques: 'How long will the recruitment process take?', ans: 'Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc'},
    {index: 3, ques: 'Do you recruit for Graduates, Apprentices and Students?', ans: 'Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc'},
    {index: 4, ques: 'What does the recruitment and selection process involve?', ans: 'Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc'},
    {index: 5, ques: 'Can I receive notifications for any future jobs that may interest me?', ans: 'Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc'},

]

export default function Jobs() {
    return (
        <main className="w-full flex h-full bg-white flex-col items-center gap-6 text-black">
            <div className="flex w-full h-84 flex-col items-center bg-black justify-between pb-30">
                <Header theme="dark" page="about" />
                <h1 className="font-bold text-5xl text-white">About Us</h1>
            </div>
            <div className="flex grid grid-cols-2 gap-6 p-4 my-4 w-8/9 items-center max-md:grid-cols-1">
                <h1 className="text-4xl font-bold ">Et nunc ut tempus duis nisl sed massa</h1>
                <p className="">Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc. </p>
            </div>
            <div className="aboutTop"></div>
            <div className="flex flex-col items-center my-8">
                <div className="flex flex-col w-1/2 text-center gap-6 max-md:w-3/4">
                    <h1 className="text-3xl font-bold">How it works</h1>
                    <p className="line-clamp-2">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scelerisque rhoncus
                        . Lectus dolor blandit massa pretium id ultrices phasellus tortor. Risus risus lectus augue justo lacus viverra sit. Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit. Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat aenean. Vulputate praesent congue faucibus in euismod feugiat euismod volutpat. Adipiscing risus amet phasellus imperdiet eget vel pulvinar. Risus in felis faucibus sit. Scelerisque consequat iaculis mauris amet vel felis id tincidunt nunc.</p>
                </div>
                <div className="flex justify-around w-full my-8 max-md:flex-col max-md:items-center">
                    {works.map((items, index) => (
                        <Cards logo={items.logo} title={items.title} desc={items.desc} key={index} />
                    ))}
                </div>
            </div>
            <div className="aboutMid relative flex items-center justify-center max-md:flex-col">
                <div className="flex flex-col items-center justify-center gap-8 max-md:h-80">
                    <div className="play flex items-center justify-center"><Image src='/images/about/Polygon 1.svg' height={40} width={40} alt="play" /></div>
                    <h1 className="text-white text-3xl text-center font-bold w-3/4">
                        Good Life Begins With
                        A Good Company
                    </h1>
                </div>
                <div className="absolute bottom-0 z-2 text-white grid grid-cols-3 bg-black w-full max-md:grid-cols-1 max-md:relative">
                    <div className="flex p-6 gap-4">
                        <h1 className="index">1</h1>
                        <div>
                            <p className="text-xl">Elit gravida lorem amet porta risus vitae at</p>
                            <a className="text-[#309689]">Learn more</a>
                        </div>
                    </div>
                    <div className="flex justify-between p-6 gap-4">
                        <h1 className="index">2</h1>
                        <div>
                            <p className="text-xl line-clamp-2 ">Volutpat dui lacus mattis urna platea
                                consequat sagittis. Nulla feugiat nec massa egestas pellentesque platea. Elementum faucibus netus gravida lacus lorem sed quam cursus penatibus. Fringilla quam sed porta phasellus faucibus vitae. Elit gravida lorem amet porta risus vitae at. Pretium massa sit massa egestas pellentesque neque ultrices enim nunc. Nunc sodales tortor tristique aenean a ultrices felis non. Eu eleifend suscipit semper nulla in morbi aliquet feugiat. Ut in facilisi eu venenatis est tincidunt. Malesuada risus fringilla elementum elementum scelerisque mi integer.</p>
                            <a className="text-[#309689]">Learn more</a>
                        </div>
                    </div>
                    <div className="flex p-6 gap-4">
                        <h1 className="index">3</h1>
                        <div>
                            <p className="text-xl">Elit gravida lorem amet porta risus vitae at</p>
                            <a className="text-[#309689]">Learn more</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-8/9 mt-10 flex flex-col gap-8">
                <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-3xl font-bold max-md:text-3xl max-md:text-center">Frequently Asked Questions</h1>
                    <div className="flex w-1/1 justify-between max-md:text-center">
                        <p className="w-full">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet</p>
                    </div>
                </div>
                { faq.map((items, index) => (
                    <FAQ key={index} index={items.index} ques={items.ques} ans={items.ans}/>
                ))}
            </div>
            <div className="flex gap-12 w-8/9 my-12 max-md:hidden">
                <div className="flex flex-1 items-center justify-end gap-6">
                    <div className="aboutLong1"></div>
                    <div className="flex flex-col gap-6">
                        <div className="aboutLong2"></div>
                        <div className="aboutLong3"></div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-12 justify-center">
                    <h1 className="text-4xl w-3/5 font-bold">We're Only Working With The Best</h1>
                    <p className="text-gray-600">Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit. </p>
                    <div className="grid flex gap-4 grid-cols-2">
                        <div className="flex items-center gap-6">
                            <Image src='\images\about\premium(2) 1 (1).svg' height={40} width={40} alt="img" />
                            <h2 className="text-lg font-bold">Quality Job</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <Image src='\images\about\resume(1).svg' height={40} width={40} alt="img" />
                            <h2 className="text-lg font-bold">Resume builder</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <Image src='\images\about\quality-assurance 1.svg' height={40} width={40} alt="img" />
                            <h2 className="text-lg font-bold">Top Companies</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <Image src='\images\about\excellence(1) 2.svg' height={40} width={40} alt="img" />
                            <h2 className="text-lg font-bold">Top Talents</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-screen flex flex-col items-center p-12 text-black gap-4 max-md:px-0 max-md:pb-0 max-md:m-0">
                <div className="flex w-10/10 flex-col">
                    <div className="flex flex-col w-1/1 gap-4 text-center">
                        <h1 className="text-5xl font-bold max-md:text-3xl max-md:text-center">News and Blogs</h1>
                        <div className="flex w-1/1 justify-between max-md:text-center">
                            <p className="w-full">Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor</p>

                        </div>
                    </div>
                    <div className="flex max-md:overflow-x-auto max-md:w-screen max-md:m-0 max-md:whitespace-nowrap ">
                        {newsBlog.map((item, index) => (
                            <News key={index} type={item.type} thumb={item.thumb} date={item.date} title={item.title} height={item.height} width={item.width} />
                        ))}
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    )
}