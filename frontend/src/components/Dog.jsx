import { BiShow, BiUserCircle } from 'react-icons/bi';
import { FaDog } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import DogDetail from './DogDetail';
import { Link } from 'react-router-dom';
import { deleteDog } from '../controller/dogsController';

const Dog = ({ dog }) => {
	const [showDetail, setShowDetail] = useState(false);

    return (
        <div key={dog._id} className='dog-card'>
            <div className='flex justify-start items-center gap-x-2'>
                <FaDog className='name' />
                <h2 className='my-1 text-lg font-semibold'>{dog.name}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <h2 className='my-1 text-lg age'>{dog.age} year(s) old</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <h2 className='my-1 breed'>{dog.breed}</h2>
            </div>
            <Link to={`/users/${dog.user._id}`}>
                <div className='flex justify-start items-center gap-x-2'>
                    <BiUserCircle className='text-indigo-500 text-2xl' />
                    <h2 className='my-1 username'>{dog.user.username}</h2>
                </div>
            </Link>
            {
                dog.user.email === localStorage.getItem('email') &&
                <div className='action-icons'>
                    <BiShow className='text-3xl text-blue-800' onClick={() => setShowDetail(true)} />
                    <Link to="/edit" state={ dog }>
                        <AiOutlineEdit className='edit-icon'/>
                    </Link>
                    <button onClick={() => deleteDog(dog._id)}>
                        <MdOutlineDelete className='delete-icon'/>
                    </button>
                </div>
            }
            {
                showDetail && (
                    <DogDetail  dog={dog} onClose={() => setShowDetail(false)} />
                )
            }
        </div>
    )
}

export default Dog;
