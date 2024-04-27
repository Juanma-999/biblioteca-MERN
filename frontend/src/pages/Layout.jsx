import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const Layout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser({ email: null, books: [] });
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            <header className="bg-indigo-500 text-white">
                <nav>
                    {user.email ? (
                        <div className="navbar">
                            <Link className="nav-link" to="/">Home</Link>
                            <button className="nav-link" onClick={handleLogout}>Log out</button>
                        </div>
                        ) : (
                            <div className="navbar">
                                <Link className="nav-link" to="/login">Log in</Link>
                                <Link className="nav-link" to="/register">Register</Link>
                            </div>
                        )
                    }
                </nav>
            </header>
            <main className='p-5'>
                <Outlet />
            </main>
        </>
    );
};

export default Layout