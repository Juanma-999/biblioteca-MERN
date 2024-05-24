import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import DogDetail from './DogDetail';
import { createNotification } from '../controller/notificationsController';

const Walk = ({ walk, onDelete }) => {
    const [showDetail, setShowDetail] = useState(null);

    const handleDelete = async () => {
        try {
            await onDelete();
            toast.success("Walk deleted successfully!", {
                position: "top-right",
                autoClose: 5000,
            });
        } catch (e) {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    const handleApply = async () => {
        try {
            await createNotification({
                receiver: walk.user._id,
                title: "A user applied to one of your walks!",
                requester: localStorage.getItem("userId"),
                walk: walk._id
            });
            toast.success("Notification sent!", {
                position: "top-right",
                autoClose: 5000,
            });
        } catch (e) {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <div className="component-card">
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
                        {showDetail === dog._id && (
                            <DogDetail dog={dog} username={walk.user.username} userId={walk.user._id} onClose={() => setShowDetail(null)} />
                        )}
                        <button onClick={() => setShowDetail(dog._id)} className="text-blue-500">{dog.name}</button>
                    </div>
                ))}
            </div>
            {walk.user._id === localStorage.getItem('userId') ? (
                <div className='action-icons'>
                    <button onClick={handleDelete}>
                        <MdOutlineDelete className='delete-icon'/>
                    </button>
                </div>
            ) : (
                <div className='action-icons'>
                    <button className="indigo-button" onClick={handleApply}>
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
};

export default Walk;
