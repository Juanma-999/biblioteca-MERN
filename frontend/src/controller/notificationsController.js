const createNotification = async ({ receiver, title, walk, requester }) => {
    const res = await fetch(`/api/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ receiver, title, walk, requester }),
    });
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error);
    }

    return data;
};

const getNotificationsByUser = async (userId) => {
    const res = await fetch(`/api/notifications/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error);
    }
    return data;
};


export { createNotification, getNotificationsByUser };
