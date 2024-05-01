import { useContext, useState, useEffect } from "react";
import { getDogs } from "../controller/dogsController";
import { DogContext } from "../context/DogContext";
import Dog from "../components/Dog";
import { FaSpinner } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { dogs, setDogs } = useContext(DogContext);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDogs();
                setDogs(data.dogs);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dogs:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [setDogs]);

    if (loading) {
        return <FaSpinner className="animate-spin text-5xl text-center block" />;
    }

    if (!user.email) {
        navigate('/login');
        return null;
    }

    return (
        <section className="card">
            <h1 className="title">Latest dogs</h1>
            <div className='flex flex-wrap'>
                {dogs && dogs.map((dog) => (
                    <div key={dog._id}>
                        <Dog dog={dog}/>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Home;
