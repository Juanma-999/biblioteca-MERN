import { Link } from 'react-router-dom';

const Layout = () => {

    return<>
        <header className="bg-indigo-500 text-white">
            <nav className="flex items justify-between p-4">
                <Link to="/">Home</Link>
                <div className="flex items-center gap-2">
                    <Link to="/login">Log in</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    </>
}

export default Layout