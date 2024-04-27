import { useContext, useState, useEffect } from "react";
import { getBooks } from "../controller/booksController";
import { BookContext } from "../context/BookContext";
import Book from "../components/Book";
import { FaSpinner } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { books, setBooks } = useContext(BookContext);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(async () => {
            const data = await getBooks();
            setBooks(data.books);
            setLoading(false);
        }, 500);
    }, []);
    return (
        <section className="card">
            {user.email ? (
                <div>
                    <h1 className="title">Latest books</h1>
                    { loading && (<FaSpinner className="animate-spin text-5xl text-center block" />)}
                    <div className='flex flex-wrap'>
                        { books && books.map((book) => <div key={book._id}>
                        <Book book={book}/>
                        </div>)}
                    </div>
                </div>
                ) : (
                <div>
                    { navigate('/login') }
                </div>
                )
            }
        </section>
    )
}

export default Home;