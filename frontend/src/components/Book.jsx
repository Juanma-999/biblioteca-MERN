import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiShow, BiUserCircle } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { FaRegCalendar } from "react-icons/fa";
import { useState } from 'react';
import BookDetail from './BookDetail';
import { Link } from 'react-router-dom';

const Book = ({ book }) => {
	const [showDetail, setShowDetail] = useState(false);
    return (
        <div
        key={book._id}
        className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
        >
			<div className='flex justify-start books-center gap-x-2'>
				<PiBookOpenTextLight className='text-red-300 text-2xl' />
				<h2 className='my-1'>{book.title}</h2>
			</div>
			<div className='flex justify-start books-center gap-x-2'>
				<BiUserCircle className='text-red-300 text-2xl' />
				<h2 className='my-1'>{book.author}</h2>
			</div>
            <div className='flex justify-start books-center gap-x-2'>
				<FaRegCalendar className='text-red-300 text-2xl' />
                <h2 className='my-1'>{book.publishYear}</h2>
			</div>
            <h4 className='my-2 text-gray-500'>ID: {book._id}</h4>
			<div className='flex justify-between books-center gap-x-2 mt-4 p-4'>
				<BiShow
					className='text-3xl text-blue-800 hover:text-black cursor-pointer'
					onClick={() => setShowDetail(true)}
				/>
				<Link to="/edit" state={ book }>
					<AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black'/>
				</Link>
				<button>
					<MdOutlineDelete className='text-2xl text-red-600 hover:text-black'/>
				</button>
			</div>
			{
				showDetail && (
					<BookDetail  book={book} onClose={() => setShowDetail(false)} />
				)
			}
        </div>
    )
}

export default Book;