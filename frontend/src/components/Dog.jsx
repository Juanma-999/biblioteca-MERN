import { BiShow, BiUserCircle } from 'react-icons/bi';
import { FaDog, FaBirthdayCake } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import EditDog from '../pages/dogs/EditDog';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import DogDetail from './DogDetail';
import { Link } from 'react-router-dom';

const Dog = ({ dog }) => {
	const [showDetail, setShowDetail] = useState(false);

    return (
        <div
        key={dog._id}
        className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
        >
			<div className='flex justify-start books-center gap-x-2'>
				<FaDog className='text-red-300 text-2xl' />
				<h2 className='my-1'>{dog.name}</h2>
			</div>
			<div className='flex justify-start books-center gap-x-2'>
				<h2 className='my-1'>{dog.age} year(s) old</h2>
			</div>
            <div className='flex justify-start books-center gap-x-2'>
                <h2 className='my-1'>{dog.breed}</h2>
			</div>
			<div className='flex justify-start books-center gap-x-2'>
                <BiUserCircle className='text-red-300 text-2xl' />
                <h2 className='my-1'>{dog.user.email}</h2>
			</div>
            <h4 className='my-2 text-gray-500'>ID: {dog._id}</h4>
			<div className='flex justify-between books-center gap-x-2 mt-4 p-4'>
				<BiShow
					className='text-3xl text-blue-800 hover:text-black cursor-pointer'
					onClick={() => setShowDetail(true)}
				/>
				<Link to="/edit" state={ dog }>
					<AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black'/>
				</Link>
				<button>
					<MdOutlineDelete className='text-2xl text-red-600 hover:text-black'/>
				</button>
			</div>
			{
				showDetail && (
					<DogDetail  dog={dog} onClose={() => setShowDetail(false)} />
				)
			}
        </div>
    )
}


export default Dog;

