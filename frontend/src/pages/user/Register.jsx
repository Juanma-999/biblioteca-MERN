import { useState } from "react";
import Alert from "../../components/Alert";

const Register = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleRegister = (e) => {
        e.preventDefault();
        console.log(email, password, confirmPassword);
    };

    return (
        <section className="card">
            <h1 className="title">Create a new account</h1>
            <form onSubmit={handleRegister}>
                <input 
                    type='email' 
                    placeholder='Email' 
                    className='input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus />
                <input 
                type='password' 
                placeholder='Password' 
                className='input'
                value={password}
                onChange= {(e) => setPassword(e.target.value)} />
                <input 
                type='password' 
                placeholder='Confirm password' 
                className='input'
                value={confirmPassword}
                onChange= {(e) => setConfirmPassword(e.target.value)} />
                <button className='btn'>Register</button>
            </form>
            {error && <Alert msg={error} />}
        </section>
    )
}
export default Register;