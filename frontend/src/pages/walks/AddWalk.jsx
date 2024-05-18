import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import { getDogsByUser } from "../../controller/dogsController";
import Picklist from "../../components/Picklist";
import { addWalk } from "../../controller/walksController";

const CreateWalk = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [error, setError] = useState("");
    const [location, setLocation] = useState("");
    const [frequency, setFrequency] = useState("");
    const [dogs, setDogs] = useState([]);
    const [picklists, setPicklists] = useState([{ selectedDog: "" }]);
    const [selectedDogs, setSelectedDogs] = useState([]);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await getDogsByUser(userId);
                setDogs(response.data);
            } catch (error) {
                setError("Failed to fetch dogs.");
            }
        };

        if (userId) {
            fetchDogs();
        } else {
            setError("User ID is missing.");
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const walkData = {
                location,
                frequency,
                dogs: selectedDogs,
                userId
            };

            await addWalk(walkData);
            navigate(`/users/${userId}`);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddPicklist = () => {
        setPicklists([...picklists, { selectedDog: "" }]);
    };

    const handlePicklistChange = (index, value) => {
        const newPicklists = picklists.slice();
        newPicklists[index].selectedDog = value;
        setPicklists(newPicklists);

        const newSelectedDogs = [...selectedDogs];
        newSelectedDogs[index] = value;
        setSelectedDogs(newSelectedDogs.filter(dogId => dogId)); // Filter out any empty values
    };

    return (
        <div className="flex justify-center">
            <section className="card">
                <h1 className="text-3xl my-4">Add walk</h1>
                <form onSubmit={handleSubmit}>
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
                    {picklists.map((picklist, index) => (
                        <Picklist
                            key={index}
                            dogs={dogs}
                            selectedDog={picklist.selectedDog}
                            onSelectDog={(value) => handlePicklistChange(index, value)}
                        />
                    ))}
                    <button type="button" onClick={handleAddPicklist} className="p-2 bg-green-300 m-2">
                        Add Another Dog
                    </button>
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
