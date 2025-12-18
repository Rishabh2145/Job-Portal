import Images from 'next/image';

export default function Category(props) {
    return(
        <div className='basis-1 justify-around items-center flex flex-col gap-4 h-64 bg-white rounded-3xl p-10 cursor-pointer hover:shadow-xl hover:scale-105 transition-all'>
            <Images src={`/images/categories/${props.image}`} alt="Category Image" width={40} height={40} />
            <p className='text-xl font-bold'>{props.name}</p>
            <p className='bg-[#309689]/15 p-1 px-2 text-[#309689] rounded-lg'>{props.job} jobs</p>
        </div>
    )
};