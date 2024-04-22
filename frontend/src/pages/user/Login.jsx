import { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { loginUser } from "../../controller/usersController";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData.email, formData.password);
            setUser({ email: formData.email, books: [] });
            navigate('/');
        } catch(error) {
            setError(error.message);
        }
    };

    return (
        <section className="card">
            <h1 className="title">Create a new account</h1>
            <form onSubmit={handleLogin}>
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
                <button className='btn'>Login</button>
            </form>
            {error && <Alert msg={error} />}
        </section>
    )
}
export default Login;