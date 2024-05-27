import { useContext, useState, useEffect } from "react";
import { getWalks } from "../controller/walksController";
import { WalksContext } from "../context/WalksContext";
import Walk from "../components/Walk";
import { FaSpinner, FaSearch } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteWalk } from "../controller/walksController";

const Home = () => {
    const { walks, setWalks } = useContext(WalksContext);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showDeleteWalkModal, setShowDeleteWalkModal] = useState(false);
    const [walkToDelete, setWalkToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredWalks, setFilteredWalks] = useState([]);

    const handleDeleteWalk = (walkId) => {
        setWalkToDelete(walkId);
        setShowDeleteWalkModal(true);
    };

    const handleDeleteConfirm = async () => {
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
        setShowDeleteWalkModal(false);
        setWalkToDelete(null);
    };

    const handleDeleteCancel = () => {
        setShowDeleteWalkModal(false);
        setWalkToDelete(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getWalks();
                const walksData = data.map((walk) => {
                    return {
                        ...walk,
                        dogs: walk.dogs.map((dog) => ({
                            ...dog,
                            user: walk.user._id
                        }))
                    };
                });
                setWalks(walksData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [setWalks]);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredWalks(walks);
        } else {
            const filtered = walks.filter(walk =>
                walk.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredWalks(filtered);
        }
    }, [searchQuery, walks]);

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin text-5xl" />
            </div>
        )
    }

    if (!user.email) {
        navigate('/login');
        return null;
    }

    if (error) {
        return <div className='text-red-500'>{error}</div>;
    }

    return (
        <div className="flex justify-center">
            <section className="card relative">
                <div className="flex justify-end items-center absolute top-0 right-0 m-4">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search by location"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <h1 className="title">Latest walks:</h1>
                <div className="container">
                    {filteredWalks.map((walk) => (
                        <Walk key={walk._id} walk={walk} onDelete={() => handleDeleteWalk(walk._id)}/>
                    ))}
                </div>
            </section>
            {
                (showDeleteWalkModal ) && (
                    <div className={`fixed inset-0 w-full h-full z-50 bg-gray-700 bg-opacity-50 flex items-center justify-center ${showDeleteWalkModal ? "block" : "hidden"}`}>
                        <div className="bg-white p-8 rounded-md">
                            <h2 className="text-2xl">Delete walk?</h2>
                            <p>
                                Are you sure you want to delete this walk?
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

export default Home;



