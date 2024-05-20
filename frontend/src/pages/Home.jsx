import { useContext, useState, useEffect } from "react";
import { getWalks } from "../controller/walksController";
import { WalksContext } from "../context/WalksContext";
import Walk from "../components/Walk";
import { FaSpinner } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { walks, setWalks } = useContext(WalksContext);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getWalks();
                console.log('data:', data);
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

    if(error) {
        return <div className='text-red-500'>{error.message}</div>;
    }

    return (
        <div className="flex justify-center">
            <section className="card">
                <h1 className="title">Latest walks:</h1>
                <div className="container">
                    {walks && walks.map((walk) => (
                        <Walk key={walk._id} walk={walk}/>
                    ))}
                </div>
            </section>
        </div>
    );
};


export default Home;


