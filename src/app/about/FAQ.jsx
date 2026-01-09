import Image from "next/image"
import { useState } from "react"
export default function FAQ(props) {
    const [toggle, setToggle] = useState(true)
    return (
        <div className={`${toggle ? '' : "fadeBlue p-4 rounded-xl"} flex gap-4 grid grid-cols-10  justify-center transition-all`}>
            <div className={`text-xl ${toggle ? 'text-gray-600 font-bold' : 'faq'}`}>{props.index}</div>
            <div className="grid col-span-8">
                <h2 className={`text-xl ${toggle ? 'text-black ' : 'faq'} font-bold`}>{props.ques}</h2>
                <p className={`${toggle ? 'hidden' : 'block'}`} >{props.ans}</p>
            </div>
            <div className="flex justify-end" onClick={() => setToggle(!toggle)}>
                <Image src={`${toggle ? '/images/about/plus-circle.svg' : '/images/about/plus-circle (1).svg'}`} height={40} width={40} alt="show" />
            </div>
        </div >
    )
}