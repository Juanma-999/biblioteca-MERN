import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addDog } from "../../controller/dogsController";
import Alert from "../../components/Alert";

const AddDog = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState(0);
    
    const { userId } = useParams();
    
    const handleSubmit = async () => {
        try {
            const data = await addDog(name, breed, age, userId);
            navigate(`/users/${userId}`);
        } catch(error) {
            setError(error.message);
        }
    };
    
    return (
        <div className="flex justify-center">
        <section className="card">
        <h1 className="text-3xl my-4">Add dog</h1>
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
        <div className="my-4">
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add dog</button>
        </div>
        {error && <Alert type="error" message={error} />}
        </section>
        </div>
    );
};


export default AddDog;

