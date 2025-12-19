import Image from "next/image";
export default function Option(props){
    return(
        <a href={`/dashboard/${props.link}`} className="w-1/1 h-10 flex items-center font-bold hover:scale-105 transition-all">
            {props.name}
        </a>
    )
}