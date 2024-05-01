import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa";

const DogDetail = ( { dog, onClose }) => {
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()}
            className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
            >
                <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                onClick={onClose}
                />
                <div className='flex justify-start books-center gap-x-2'>
                    <h2 className='my-1'>{dog.name}</h2>
                </div>
                <div className='flex justify-start books-center gap-x-2'>
                    <BiUserCircle className='text-red-300 text-2xl' />
                    <h2 className='my-1'>{dog.breed}</h2>
                </div>
                <div className='flex justify-start books-center gap-x-2'>
                    <FaRegCalendar className='text-red-300 text-2xl' />
                    <h2 className='my-1'>{dog.age}</h2>
                </div>
                <p className='my-2'>
                    {dog.description || 'This dog has no description.'}
                </p>
                <h4 className='my-2 text-gray-500'>ID: {dog._id}</h4>
            </div>
        </div>
    )
}

export default DogDetail;
