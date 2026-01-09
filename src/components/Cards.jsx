import Image from "next/image"

export default function Cards(props) {
    return (
        <main className="flex flex-col bg-white h-76 rounded-2xl justify-around items-center p-4">
            <div className="flex flex-col gap-4 items-center">
                <Image src={`/images/jobs/home/${props.logo}`} height={44} width={44} alt="Apple" className="bg-black p-2 rounded-lg"/>
                <h1 className="text-xl font-bold">{props.name}</h1>
            </div>
            <div className="text-center text-sm p-4">{props.desc}</div>
            <div className="fadeBlue p-2 rounded-xl text-blue-500">{props.noJob} open jobs</div>
        </main>
    )
}