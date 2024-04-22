import { useEffect } from "react";
import { getBooks } from "../../controller/booksController";

const Home = () => {

    useEffect(() => {
        setTimeout(async () => {
            const data = await getBooks();
            console.log(data);
        }, 500);
    }, [])

    return (
        <section className="card">
            <h1 className="title">Latest books</h1>
            <div>posts</div>
        </section>
    )
}

export default Home;