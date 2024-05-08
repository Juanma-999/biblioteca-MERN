const getDogs = async () => {
    const res = await fetch('/api/dogs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
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

const getDogsByUser = async (userId) => {
    const res = await fetch(`/api/dogs/user/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    const data = await res.json();

    if(!res.ok) {
        throw Error(data.error);
    }

    return data;
}


export { getDogs, getDogsByUser, updateDog };

