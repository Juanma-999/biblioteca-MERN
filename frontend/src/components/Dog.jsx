import { BiShow, BiUserCircle } from 'react-icons/bi';
import { FaDog } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import DogDetail from './DogDetail';
import { Link } from 'react-router-dom';

const Dog = ({ dog, onDelete }) => {
    const [showDetail, setShowDetail] = useState(false);

    const handleDelete = () => {
        onDelete();
    };

    return (
        <div className='component-card flex justify-between items-start'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <FaDog className='text-indigo-500 text-2xl' aria-label="Dog icon" />
                    <h2 className='my-1 text-lg font-semibold'>{dog.name}</h2>
                </div>
                <div className='flex items-center gap-2'>
                    <h2 className='my-1 text-lg'>{dog.age} year(s) old</h2>
                </div>
                <div className='flex items-center gap-2'>
                    <h2 className='my-1 text-lg'>{dog.breed}</h2>
                </div>
                <Link to={`/users/${dog.user._id}`} className="flex items-center gap-2 text-indigo-500 hover:text-blue-500">
                    <BiUserCircle className='text-2xl' aria-label="User icon" />
                    <h2 className='my-1 text-lg'>{dog.user.username}</h2>
                </Link>
            </div>
            {dog.user.email === localStorage.getItem('email') && (
                <div className='text-3xl flex flex-col items-end gap-4'>
                    <BiShow className='text-blue-500 hover:text-black cursor-pointer' onClick={() => setShowDetail(true)} aria-label="Show details" />
                    <Link to={`/dogs/edit`} state={dog}>
                        <AiOutlineEdit className='text-yellow-500 hover:text-black cursor-pointer' aria-label="Edit dog" />
                    </Link>
                    <button onClick={handleDelete} aria-label="Delete dog">
                        <MdOutlineDelete className='text-red-500 hover:text-black cursor-pointer' />
                    </button>
                </div>
            )}
            {showDetail && (
                <DogDetail dog={dog} onClose={() => setShowDetail(false)} />
            )}
        </div>
    );
};

export default Dog;
