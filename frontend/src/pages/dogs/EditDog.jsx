import { useContext, useState } from "react";
import { useLocation,  useNavigate } from "react-router-dom";
import { updateDog } from "../../controller/dogsController";
import { DogContext } from "../../context/DogContext";
import Alert from "../../components/Alert";

const EditDog = () => {
    const { dogs, setDogs } = useContext(DogContext);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [error, setError] = useState(null);

    const [name, setName] = useState(state.name);
    const [breed, setBreed] = useState(state.breed);
    const [age, setAge] = useState(state.age);

    const handleUpdate = async () => {
        try {
            const { dog } = await updateDog(state._id, name, breed, age);
            setDogs((prevDogs) => prevDogs.map((d) => (d._id === state._id ? dog : d)));
            navigate("/");
        } catch(error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center">
            <section className="card">
                <h1 className="text-3xl my-4">Edit dog</h1>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Breed</label>
                    <input
                        type="text"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleUpdate}>
                    Save
                </button>
                {error && <Alert msg={error} />}
            </section>
        </div>
    )
}

export default EditDog;

