import { useContext, useState, useEffect } from "react";
import { getBooks } from "../../controller/booksController";
import { BookContext } from "../../context/BookContext";
import Book from "../../components/Book";
import { FaSpinner } from "react-icons/fa";

const Home = () => {
    const { books, setBooks } = useContext(BookContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            const data = await getBooks();
            setBooks(data.books);
            setLoading(false);
        }, 500);
    }, []);

    return (
        <section className="card">
            <h1 className="title">Latest books</h1>

            { loading && (
                <FaSpinner className="animate-spin text-5xl text-center block" />
            )}

            <div className='flex flex-wrap'>
            { books && books.map((book) => <div key={book._id}>
                <Book book={book}/>
            </div>)}
            </div>

        </section>
    )
}

export default Home;