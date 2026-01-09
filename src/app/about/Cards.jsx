import Image from "next/image"
export default function Cards (props) {
    return (
        <main className="w-60 shadow-sm rounded-xl flex flex-col justify-center items-center gap-8 h-64 max-md:w-8/9">
           <Image src={`/images/about/${props.logo}`} height={40} width={40} alt="account" />
           <div className="text-center flex items-center flex-col gap-4">
                <h3 className="font-bold">{props.title}</h3>
                <p className="text-sm text-gray-500 w-4/5">{props.desc}</p>
           </div>
        </main>
    )
}