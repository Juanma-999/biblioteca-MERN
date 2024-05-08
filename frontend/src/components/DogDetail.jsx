import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from 'react-icons/bi';
import { FaDog } from "react-icons/fa";
import { Link } from "react-router-dom";

const DogDetail = ({ dog, onClose, userId, username }) => {

    return (
        <div className='dog-detail-overlay' onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()} className='dog-detail-card'>
                <AiOutlineClose className='close-icon' onClick={onClose} />
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
                <Link to={userId ? `/users/${userId}` : `/users/${dog.user._id}`}>
                    <div className='flex justify-start items-center gap-x-2'>
                        <BiUserCircle className='text-indigo-500 text-2xl' />
                        <h2 className='my-1 username'>{username || dog.user.username}</h2>
                    </div>
                </Link>
                <p className='description'>{dog.description || 'This dog has no description.'}</p>

            </div>
        </div>
    )
}

DogDetail.defaultProps = {
    userId: null
}

export default DogDetail;