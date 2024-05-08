import { useContext, useState } from "react";
import { useLocation,  useNavigate } from "react-router-dom";
import { createWalk } from "../../controller/walksController";
import { WalksContext } from "../../context/WalksContext";
import Alert from "../../components/Alert";

const CreateWalk = () => {
    const { walks, setWalks } = useContext(WalksContext);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [error, setError] = useState(null);

    const [date, setDate] = useState("");
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [dogId, setDogId] = useState(state._id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await createWalk(dogId, date, distance, duration);
            setWalks([...walks, data.walk]);
            navigate("/");
        } catch(error) {
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
                        <label className="text-xl mr-4 text-gray-500">Distance (km)</label>
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Duration (minutes)</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <button className="p-2 bg-sky-300 m-8" type="submit">
                        Save
                    </button>
                </form>
                {error && <Alert msg={error} />}
            </section>
        </div>
    )
}

export default CreateWalk;
