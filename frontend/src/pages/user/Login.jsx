import { useContext, useState } from "react";
import { loginUser } from "../../controller/usersController";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData.email, formData.password);
            setUser({ email: formData.email });
            navigate('/');
        } catch(e) {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <div className="flex justify-center">
            <section className="card auth">
                <h1 className="title">Log in to your account</h1>
                <form className="form" onSubmit={handleLogin}>
                    <input
                        type='email'
                        placeholder='Email'
                        className='input'
                        value={formData.email}
                        onChange= {(e) => setFormData({ ...formData, email: e.target.value })}
                        autoFocus
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='input'
                        value={formData.password}
                        onChange= {(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button className='btn'>
                        Login
                    </button>
                </form>
                <Link className='link' to="/register">Don&apos;t have an account?</Link>
            </section>
        </div>
    )
}
export default Login;

