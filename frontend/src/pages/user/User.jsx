import { Link, useParams } from 'react-router-dom';
import { getUserById } from "../../controller/usersController";
import { deleteWalk, getWalksByUser } from '../../controller/walksController';
import { useEffect, useState } from "react";
import { deleteDog, getDogsByUser } from "../../controller/dogsController";
import Dog from "../../components/Dog";
import Walk from "../../components/Walk";
import { FaSpinner } from 'react-icons/fa';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [walks, setWalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dogToDelete, setDogToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userInfo = await getUserById(id);
        setUser(userInfo);
        const dogsInfo = await getDogsByUser(id);
        setDogs(dogsInfo.data);
        const walksInfo = await getWalksByUser(id);
        setWalks(walksInfo.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <FaSpinner className="animate-spin text-5xl" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDeleteWalk = async (walkId) => {
    await deleteWalk(walkId);
    const updatedWalks = walks.filter(walk => walk._id !== walkId);
    setWalks(updatedWalks);
  };

  const handleDeleteDog = (dogId) => {
    setDogToDelete(dogId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteDog(dogToDelete);
    setShowDeleteModal(false);
    setDogToDelete(null);
    const updatedDogs = dogs.filter(dog => dog._id !== dogToDelete);
    setDogs(updatedDogs);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDogToDelete(null);
  };

  return (
    <div className="flex justify-center">
      <section className="card">
        <div>
          <p>
            <b>Username:</b> {user.username}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <div className='flex flex-row justify-between'>
            <h2 className="title my-1">Dogs owned by {user.username}:</h2>
            {
              id === localStorage.getItem("userId") && (
                <Link to={`/users/${user._id}/add-dog`}>
                  <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Add Dog
                  </button>
                </Link>
              )
            }
          </div>
          <div className="container">
            {dogs.map((dog) => (
              <div key={dog._id}>
                <Dog dog={dog} onDelete={() => handleDeleteDog(dog._id)}/>
              </div>
            ))}
          </div>
          <h2 className="title my-1">Walks published by {user.username}:</h2>
          <div className="container">
            {walks.map((walk) => (
              <div key={walk._id}>
                <Walk walk={walk} onDelete={() => handleDeleteWalk(walk._id)}/>
              </div>
            ))}
          </div>
        </div>
      </section>
      {
        showDeleteModal && (
          <div className="fixed inset-0 w-full h-full z-50 bg-gray-700 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md">
              <h2 className="text-2xl">Delete dog?</h2>
              <p>
                Are you sure you want to delete this dog?
              </p>
              <div className="flex justify-end">
                <button className="mr-4" onClick={handleDeleteCancel}>Cancel</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteConfirm}>Confirm</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};


export default User;
