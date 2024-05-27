import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import DogDetail from './DogDetail';
import { createNotification } from '../controller/notificationsController';
import { AiOutlineEdit } from 'react-icons/ai';

const Walk = ({ walk, onDelete }) => {
    const [showDetail, setShowDetail] = useState(null);

    const handleDelete = async () => {
        try {
            await onDelete();
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
        <div className="component-card flex justify-between items-start overflow-y-auto">
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <h2 className='my-1 text-lg'><b>Date:</b> {new Date(walk.date).toLocaleDateString()}</h2>
                </div>
                <div className='flex items-center gap-2'>
                    <h2 className='my-1 text-lg'><b>Location:</b> {walk.location}</h2>
                </div>
                <div className='flex items-center gap-2'>
                    <h2 className='my-1 text-lg'><b>Frequency:</b> {walk.frequency}</h2>
                </div>
                <Link to={`/users/${walk.user._id}`} className="flex items-center gap-2 text-indigo-500 hover:text-blue-500">
                    <BiUserCircle className="text-2xl" aria-label="User icon" />
                    <h2 className="text-lg">{walk.user.username}</h2>
                </Link>
                <div className='flex items-center gap-2 flex-wrap'>
                    <h2 className='my-1 text-lg'><b>Dogs:</b></h2>
                    <div className="inline-flex gap-2 flex-wrap max-h-32">
                        {walk.dogs.map((dog) => (
                            <div key={dog._id} className="inline-block">
                                {showDetail === dog._id && (
                                    <DogDetail dog={dog} username={walk.user.username} userId={walk.user._id} onClose={() => setShowDetail(null)} />
                                )}
                                <button onClick={() => setShowDetail(dog._id)} className="text-blue-500">{dog.name}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {walk.user._id === localStorage.getItem('userId') ? (
                <div className="text-3xl flex flex-col items-end gap-4">
                    <Link to="/walks/edit" state={walk}>
                        <AiOutlineEdit className='text-yellow-500 hover:text-black cursor-pointer' aria-label="Edit walk" />
                    </Link>
                    <button onClick={handleDelete} aria-label="Delete walk">
                        <MdOutlineDelete className='text-red-500 hover:text-black cursor-pointer' />
                    </button>
                </div>
            ) : (
                <div className='flex flex-col items-end gap-4'>
                    <button className="indigo-button" onClick={handleApply}>
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
};

export default Walk;

