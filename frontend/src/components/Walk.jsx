import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import DogDetail from './DogDetail';
import { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

const Walk = ({ walk, onDelete }) => {
    const [showDetail, setShowDetail] = useState(false);

    const handleDelete = () => {
        onDelete();
    };

    const handleApply = () => {
        
    }

    return (
        <div key={walk._id} className="dog-card">
            <div className='flex justify-start items-center gap-x-2'>
                <h2 className='my-1 breed'><b>Location:</b> {walk.location}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <h2 className='my-1 breed'><b>Frequency:</b> {walk.frequency}</h2>
            </div>
            <Link to={`/users/${walk.user._id}`} className="flex items-center gap-x-2 text-indigo-500 hover:text-blue-500">
                <BiUserCircle className="text-2xl" />
                <h2 className="username font-medium">{walk.user.username}</h2>
            </Link>
                <h2 className='my-1 breed'><b>Dogs:</b></h2>
                <div className="flex flex-row gap-x-4 flex-wrap">
                    {walk.dogs.map((dog) => (
                        <div key={dog._id}>
                            {showDetail && showDetail === dog._id && (
                                <DogDetail dog={dog} username={walk.user.username} userId={walk.user._id} onClose={() => setShowDetail(false)} />
                            )}
                            <button onClick={() => setShowDetail(dog._id)} className="text-blue-500">{dog.name}</button>
                        </div>
                    ))}
                </div>
                {
                    walk.user._id === localStorage.getItem('userId') &&
                    <div className='action-icons'>
                        <button onClick={handleDelete}>
                            <MdOutlineDelete className='delete-icon'/>
                        </button>
                    </div>
                }
                {
                    walk.user._id != localStorage.getItem('userId') &&
                    <div className='action-icons'>
                        <button className="indigo-button" onClick={handleApply}>
                            Apply
                        </button>
                    </div>
                }
        </div>
    )
}

export default Walk;

