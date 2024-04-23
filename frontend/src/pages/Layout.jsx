import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {

    return (
        <>
            <header className="bg-indigo-500 text-white">
                <nav className="navbar">
                    <Link className="nav-link" to="/">Home</Link>
                    <div className="flex items-center gap-4">
                        <Link className="nav-link" to="/login">Log in</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                    </div>
                </nav>
            </header>
            <main className='p-4'>
                <Outlet />
            </main>
        </>
    );
};

export default Layout