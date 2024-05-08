const getWalks = async () => {
    const res = await fetch('/api/walks', {
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

const getWalksByUser = async (userId) => {
    const res = await fetch(`/api/walks/user/${userId}`, {
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

const addWalk = async (walk) => {
    try {
        const response = await fetch('/api/walks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(walk)
        });
        const newWalk = await response.json();
        return newWalk;
    } catch (error) {
        console.error(error.message);
    }
}

const deleteWalk = async (id) => {
    try {
        const response = await fetch(`/api/walks/${id}`, {
            method: 'DELETE'
        });
        return response.status;
    } catch (error) {
        console.error(error.message);
    }
}

const updateWalk = async (id, walk) => {
    try {
        const response = await fetch(`/api/walks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(walk)
        });
        const updatedWalk = await response.json();
        return updatedWalk;
    } catch (error) {
        console.error(error.message);
    }
}

export { getWalks, getWalksByUser, addWalk, deleteWalk, updateWalk };
