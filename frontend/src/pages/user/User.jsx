import { Link, useParams } from 'react-router-dom';
import { getUserById } from "../../controller/usersController";
import { deleteWalk, getWalksByUser } from '../../controller/walksController';
import { useEffect, useState } from "react";
import { deleteDog, getDogsByUser } from "../../controller/dogsController";
import Dog from "../../components/Dog";
import Walk from "../../components/Walk";
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [walks, setWalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteWalkModal, setShowDeleteWalkModal] = useState(false);
  const [showDeleteDogModal, setShowDeleteDogModal] = useState(false);
  const [walkToDelete, setWalkToDelete] = useState(null);
  const [dogToDelete, setDogToDelete] = useState(null);
  const [error, setError] = useState(null);

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
        setLoading(false);
        setError(error);
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

  if(error) {
    return <div className='text-red-500'>{error.message}</div>;
  }

  const handleDeleteWalk = (walkId) => {
    setWalkToDelete(walkId);
    setShowDeleteWalkModal(true);
  };

  const handleDeleteDog = (dogId) => {
    setDogToDelete(dogId);
    setShowDeleteDogModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (walkToDelete) {
      try {
        await deleteWalk(walkToDelete);
        const updatedWalks = walks.filter(walk => walk._id !== walkToDelete);
        setWalks(updatedWalks);
      } catch (e) {
        toast.error(e.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } else {
      try {
        await deleteDog(dogToDelete);
        const updatedDogs = dogs.filter(dog => dog._id !== dogToDelete);
        setDogs(updatedDogs);
      } catch (e) {
        toast.error(e.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
    setShowDeleteWalkModal(false);
    setShowDeleteDogModal(false);
    setWalkToDelete(null);
    setDogToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteWalkModal(false);
    setShowDeleteDogModal(false);
    setWalkToDelete(null);
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
                  <button className="indigo-button">
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
          <div className='flex flex-row justify-between'>
            <h2 className="title my-1">Walks published by {user.username}:</h2>
            {
              id === localStorage.getItem("userId") && (
                <Link to={`/users/${user._id}/add-walk`}>
                  <button className="indigo-button">
                    Add Walk
                  </button>
                </Link>
              )
            }
          </div>
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
        (showDeleteWalkModal || showDeleteDogModal) && (
          <div className={`fixed inset-0 w-full h-full z-50 bg-gray-700 bg-opacity-50 flex items-center justify-center ${showDeleteWalkModal || showDeleteDogModal ? "block" : "hidden"}`}>
            <div className="bg-white p-8 rounded-md">
              <h2 className="text-2xl">{walkToDelete ? "Delete walk?" : "Delete dog?"}</h2>
              <p>
                {walkToDelete ? (
                  <p>
                    Are you sure you want to delete this walk?
                  </p>
                ) : (
                  <p>
                    Are you sure you want to delete this dog?
                  </p>
                )}
              </p>
              <div className="flex justify-end">
                <button className="mr-4" onClick={handleDeleteCancel}>Cancel</button>
                <button className="red-button" onClick={handleDeleteConfirm}>Confirm</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default User;