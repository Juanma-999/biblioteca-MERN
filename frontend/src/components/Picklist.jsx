const Picklist = ({ dogs, selectedDog, onSelectDog }) => (
    <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Dog</label>
        <select
            value={selectedDog}
            onChange={(e) => onSelectDog(e.target.value)}
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
);

export default Picklist;

