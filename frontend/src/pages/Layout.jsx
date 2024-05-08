import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BiLogIn, BiLogOut, BiUserCircle } from "react-icons/bi";
import { FaHome, FaRegIdCard } from "react-icons/fa";


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
            <header>
                <nav>
                    {user.email ? (
                        <div className="navbar">
                            <div className='flex justify-start items-center gap-x-2'>
                                <FaHome className='text-white-500 text-2xl' />
                                <Link className="nav-link" to="/">Home</Link>
                            </div>
                            <div className='flex justify-start items-center gap-x-2'>
                                <BiUserCircle className='text-white-500 text-2xl' />
                                <Link className="nav-link" to={`/users/${userId}`}>My profile</Link>
                            </div>
                            <div className='flex justify-start items-center gap-x-2'>
                                <BiLogOut className='text-white-500 text-2xl' />
                                <button className="nav-link" onClick={handleLogout}>Log out</button>
                            </div>
                        </div>
                    ) : (
                        <div className="navbar">
                            <div className='flex justify-start items-center gap-x-2'>
                                <BiLogIn className='text-white-500 text-2xl' />
                                <Link className="nav-link" to="/login">Log in</Link>
                            </div>
                            <div className='flex justify-start items-center gap-x-2'>
                                <FaRegIdCard className='text-white-500 text-2xl' />
                                <Link className="nav-link" to="/register">Register</Link>
                            </div>
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
