import Image from "next/image";

export default function Review(props) {
    return (
        <div className="flex basis-1 bg-white h-80 w-6/7 flex-col p-6 justify-between rounded-xl max-md:w-1/1">
            <div className="flex flex-col basis-1 justify-between h-5/6 gap-4 mt-4">
                <div className="flex gap-1">
                    {new Array(props.rate).fill(0).map((_, index) => (
                        <Image
                            key={index}
                            src="/images/review/Star 1.svg"
                            alt="Star"
                            width={20}
                            height={20}
                        />
                    ))}
                </div>
                <h2 className="flex text-xl font-bold">{props.title}</h2>
                <p className="text-sm line-clamp-4 italic w-6/7">{props.message}</p>
            </div>
            <div className="w-8/9 flex justify-end">
                <Image
                    src="/images/review/Quotes.svg"
                    alt="Quotes"
                    width={30}
                    height={30}
                />
            </div>
            <div className="flex items-center mb-4">
                <div>
                    <Image
                        src={props.photo}
                        alt={props.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                    />
                </div>
                <div>
                    <p className="font-bold">{props.name}</p>
                    <p className="text-xs text-gray-700">{props.position}</p>
                </div>
            </div>
        </div>
    );
}