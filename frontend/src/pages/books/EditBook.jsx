import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { updateBook } from "../../controller/booksController";
import { BookContext } from "../../context/BookContext";
import Alert from "../../components/Alert";

const EditBook = () => {
    const { books, setBooks } = useContext(BookContext);
    const { state } = useLocation();
    const [error, setError] = useState(null);

    const [title, setTitle] = useState(state.title);
    const [author, setAuthor] = useState(state.author);
    const [publishYear, setPublishYear] = useState(state.publishYear);

    const handleUpdate = async () => {
        try {
            const data = await updateBook(state._id, title, author, publishYear);
            const updatedBooks = books.filter((book) => book._id !== state._id);
            setBooks([...updatedBooks, data.book]);
        } catch(error) {
            setError(error.message);
        }
    };

    return (
        <section className="card">
            <h1 className="text-3xl my-4">Edit book</h1>
            <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-2 border-gray-500 px-4 py-2 w-full"
                />
            </div>
            <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Author</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border-2 border-gray-500 px-4 py-2 w-full"
                />
            </div>
            <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Publish year</label>
                <input
                    type="number"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    className="border-2 border-gray-500 px-4 py-2 w-full"
                />
            </div>
            <button className="p-2 bg-sky-300 m-8" onClick={handleUpdate}>
                Save
            </button>
            {error && <Alert msg={error} />}
        </section>
    )
}

export default EditBook;