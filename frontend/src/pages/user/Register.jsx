import { useContext, useState } from "react";
import { registerUser } from "../../controller/usersController";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData.username, formData.email, formData.password, formData.confirmPassword);
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
                <h1 className="title">Create a new account</h1>
                <form className="form" onSubmit={handleRegister}>
                    <input
                        type='email'
                        placeholder='Email'
                        className='input'
                        value={formData.email}
                        onChange= {(e) => setFormData({ ...formData, email: e.target.value })}
                        autoFocus
                    />
                    <input
                        type='text'
                        placeholder='Username'
                        className='input'
                        value={formData.username}
                        onChange= {(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='input'
                        value={formData.password}
                        onChange= {(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <input
                        type='password'
                        placeholder='Confirm password'
                        className='input'
                        value={formData.confirmPassword}
                        onChange= {(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    <button className='btn'>Register</button>
                </form>
                <Link className='link' to="/login"> Already have an account?</Link>
            </section>
        </div>
    )
}
export default Register;