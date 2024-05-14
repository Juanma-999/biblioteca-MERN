import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addWalk } from "../../controller/walksController";
import Alert from "../../components/Alert";
import { getDogsByUser } from "../../controller/dogsController";

const CreateWalk = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [error, setError] = useState(null);
    const [selectedDog, setSelectedDog] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [frequency, setFrequency] = useState("");
    const [dogs, setDogs] = useState([]);
    const { userId } = useParams();
    
    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await getDogsByUser(userId);
                setDogs(response.data.docs);
            } catch (error) {
                setError("Failed to fetch dogs");
            }
        };

        fetchDogs();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addWalk(date, location, frequency, state.userId, selectedDog);
            navigate(`/users/${userId}`);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center">
            <section className="card">
                <h1 className="text-3xl my-4">Add walk</h1>
                <form onSubmit={handleSubmit}>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Frequency</label>
                        <input
                            type="text"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Dog</label>
                        <select
                            value={selectedDog}
                            onChange={(e) => setSelectedDog(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        >
                            <option value="">Select a dog</option>
                            {dogs.map(dog => (
                                <option key={dog._id} value={dog._id}>
                                    {dog.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="p-2 bg-sky-300 m-8" type="submit">
                        Save
                    </button>
                </form>
                {error && <Alert msg={error} />}
            </section>
        </div>
    );
};

export default CreateWalk;
