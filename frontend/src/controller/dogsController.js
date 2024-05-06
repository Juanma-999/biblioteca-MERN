const getDogs = async () => {
    const res = await fetch('/api/dogs')
    const data = await res.json();

    if(!res.ok) {
        throw Error(data.error);
    }

    return data;
}

const updateDog = async (_id, name, breed, age) => {
    if(!name || !breed || !age) {
        throw Error("Missing required fields");
    }
    const res = await fetch(`/api/dogs/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({name, breed, age}),
    })

    const data = await res.json();

    if(!res.ok) {
        throw Error(data.error);
    }

    return data;
}

export { getDogs, updateDog };

