import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import DogDetail from './DogDetail';
import { useState } from 'react';

const Walk = ({ walk }) => {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <div key={walk._id} className="dog-card">
            <div className='flex justify-start items-center gap-x-2'>
                <h2 className='my-1 breed'>{walk.location}</h2>
            </div>
            <Link to={`/users/${walk.user._id}`} className="flex items-center gap-x-2 text-indigo-500 hover:text-blue-500">
                <BiUserCircle className="text-2xl" />
                <h2 className="username font-medium">{walk.user.username}</h2>
            </Link>
            <div>
                <h2 className='my-1 breed'>Dogs:</h2>
                {walk.dogs.map((dog) => (
                    <div key={dog._id}>
                        {showDetail && showDetail === dog._id && (
                            <DogDetail dog={dog} onClose={() => setShowDetail(false)} />
                        )}
                        <button onClick={() => setShowDetail(dog._id)} className="text-blue-500">{dog.name}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}




export default Walk;

