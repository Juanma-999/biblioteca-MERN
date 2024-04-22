const getBooks = async () => {
    const res = await fetch('/api/books')
    const data = await res.json();

    if(!res.ok) {
        throw Error(data.error);
    }

    return data;
}

const updateBook = async (_id, title, author, publishYear) => {
    if(!title || !author || !publishYear) {
        throw Error("Missing required fields");
    }
    const res = await fetch(`/api/books/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({title, author, publishYear}),
    })

    const data = await res.json();

    if(!res.ok) {
        throw Error(data.error);
    }

    return data;
}

export { getBooks, updateBook };