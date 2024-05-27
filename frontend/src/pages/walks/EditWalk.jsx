import { useState } from "react";
import { useLocation,  useNavigate } from "react-router-dom";
import { updateWalk } from "../../controller/walksController";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditWalk = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [location, setLocation] = useState(state.location);
    const [frequency, setFrequency] = useState(state.frequency);
    const [date, setDate] = useState(state.date);

    const handleUpdate = async () => {
        try {
            await updateWalk(state._id, location, frequency, date);
            toast.success("Walk updated successfully!", {
                position: "top-right",
                autoClose: 5000,
            });
            navigate(`/users/${localStorage.getItem('userId')}`);
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
                <h1 className="text-3xl my-4">Edit walk</h1>
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
                        type="number"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleUpdate}>
                    Save
                </button>
            </section>
        </div>
    )
}

export default EditWalk;
