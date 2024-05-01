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
        setTimeout(async () => {
            const data = await getDogs();
            setDogs(data.dogs);
            setLoading(false);
        }, 500);
    }, []);
    return (
        <section className="card">
            {user.email ? (
                <div>
                    <h1 className="title">Latest dogs</h1>
                    { loading && (<FaSpinner className="animate-spin text-5xl text-center block" />)}
                    <div className='flex flex-wrap'>
                        { dogs && dogs.map((dog) => <div key={dog._id}>
                        <Dog dog={dog}/>
                        </div>)}
                    </div>
                </div>
                ) : (
                <div>
                    { navigate('/login') }
                </div>
                )
            }
        </section>
    )
}

export default Home;