import Image  from "next/image";

export default function News(props){
    return(
        <div className="flex flex-col mt-12 hover:scale-105 transition-all max-md:w-9/10 max-md:h-fit">
            <div className="static px-4 h-fit w-full">
                <h2 className="relative w-fit z-1 m-5 p-1 text-sm px-3 rounded-xl text-white bg-[#309689]">{props.type}</h2>
                <Image
                    src={props.thumb}
                    alt={props.type}
                    height={props.height}
                    width={props.width}
                    className="rounded-3xl relative -top-17"
                    
                    />
            </div>
            <div className="flex flex-col gap-4 w-9/10 p-2 px-4 relative -top-17">
                <h4 className="text-gray-500 text-sm font-bold ">{props.date}</h4>
                <h2 className="text-xl font-bold max-md:xs line-clamp-3">{props.title}</h2>
                <a className="flex gap-1 text-[#309689] text-sm font-bold">Read More <Image src="/images/review/arrow-right.svg" alt="arrow" height={20} width={20}/></a>
            </div>
        </div>
    )
};