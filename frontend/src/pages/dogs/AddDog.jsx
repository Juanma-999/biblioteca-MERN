import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addDog } from "../../controller/dogsController";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDog = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState(0);
    const [description, setDescription] = useState("");
    const { userId } = useParams();

    const handleSubmit = async () => {
        try {
            await addDog(name, breed, age, userId, description);
            navigate(`/users/${userId}`);
        } catch(e) {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 5000,
            });
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
        <label className="text-xl mr-4 text-gray-500">Description</label>
        <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border-2 border-gray-500 px-4 py-4 w-full resize-none"
        rows="5"
        />
        </div>
        <div className="my-4">
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add dog</button>
        </div>
        </section>
        </div>
    );
};


export default AddDog;

