import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const Layout = () => {
    const { user, setUser } = useContext(UserContext);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser({ email: null, books: [] });
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        navigate('/');
    };
    
    const getCurrentUserId = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const parsedToken = JSON.parse(window.atob(base64));
        console.log('parsedToken._id:', parsedToken._id);
        return parsedToken._id;
    };

    useState(() => {
        const id = getCurrentUserId();
        if (id) {
            setUserId(id);
        }
    }, []);

    return (
        <>
            <header className="bg-indigo-500 text-white">
                <nav>
                    {user.email ? (
                        <div className="navbar">
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to={`/users/${userId}`}>My profile</Link>
                            <button className="nav-link" onClick={handleLogout}>Log out</button>
                        </div>
                    ) : (
                        <div className="navbar">
                            <Link className="nav-link" to="/login">Log in</Link>
                            <Link className="nav-link" to="/register">Register</Link>
                        </div>
                    )}
                </nav>
            </header>
            <main className='p-5'>
                <Outlet />
            </main>
        </>
    );
};

export default Layout
