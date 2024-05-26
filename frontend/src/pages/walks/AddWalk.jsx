import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDogsByUser } from "../../controller/dogsController";
import Picklist from "../../components/Picklist";
import { addWalk } from "../../controller/walksController";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateWalk = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [location, setLocation] = useState("");
    const [frequency, setFrequency] = useState("");
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState("");
    const [dOGS, setDogs] = useState([]);
    const [picklists, setPicklists] = useState([{ selectedDog: "" }]);
    const [selectedDogs, setSelectedDogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await getDogsByUser(userId);
                setDogs(response.data);
            } catch (e) {
                toast.error(e.message, {
                    position: "top-right",
                    autoClose: 5000,
                });
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
                date: dateString,
                dogs: selectedDogs,
                userId
            };
            await addWalk(walkData);
            toast.success("Walk added successfully!", {
                position: "top-right",
                autoClose: 5000,
            });
            navigate(`/users/${userId}`);
        } catch (e) {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 5000,
            });
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
        setSelectedDogs(newSelectedDogs.filter(dogId => dogId));
    };

    const handleDateChange = (e) => {
        setDate(e.target.valueAsDate);
        setDateString(e.target.value);
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

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
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Date</label>
                        <input
                            type="date"
                            value={dateString}
                            onChange={handleDateChange}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    {picklists.map((picklist, index) => (
                        <Picklist
                            key={index}
                            dogs={dOGS}
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
            </section>
        </div>
    );
};

export default CreateWalk;
