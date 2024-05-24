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

const deleteDog = async (_id) => {
    const res = await fetch(`/api/dogs/${_id}`, {
        method: 'DELETE',
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

const getDog = async (_id) => {
    const res = await fetch(`/api/dogs/${_id}`, {
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
    return data.dog;
}

const updateDog = async (_id, name, breed, age, description) => {
    if(!name || !breed || !age) {
        throw Error("Missing required fields");
    }
    const res = await fetch(`/api/dogs/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({name, breed, age, description}),
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

const addDog = async (name, breed, age, userId, description ) => {
    if(!name || !breed || !age ) {
        throw Error("Missing required fields");
    }
    const res = await fetch(`/api/dogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({name, breed, age, userId, description }),
    })

    const data = await res.json();

    if(!res.ok) {
        throw Error(data.error);
    }

    return data;
}


export { deleteDog, getDog, addDog, getDogs, getDogsByUser, updateDog };

