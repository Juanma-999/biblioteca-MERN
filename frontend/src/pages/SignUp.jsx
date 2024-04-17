import Spinner from '../components/Spinner';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = () => {
        const data = {
            email,
            password,
        };
        setLoading(true);
        axios
        .post(`http://localhost:5555/api/users/signup`, data)
        .then(() => {
            setLoading(false);
            navigate('/login');
        })
        .catch((error) => {
            setLoading(false);
            alert('An error happened. Please check the console.');
            console.log(error);
        });
    };

    return (
        <div className="p-4">
        <h1 className="text-3xl my-4">Sign up</h1>
        {loading ? <Spinner /> : ''}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">email</label>
        <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Password</label>
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSignUp}>
        Create account
        </button>
        </div>
        </div>
    )
}

export default SignUp