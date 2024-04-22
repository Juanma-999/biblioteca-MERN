const loginUser = async(email, password) => {
    if(!email || !password) {
        throw Error('Missing required fields');
    }
    const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    const data = await res.json();

    if(!res.ok) {
        throw Error(data.error);
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);

    return data;
}

const registerUser = async(email, password, confirmPassword) => {
    if(!email || !password || !confirmPassword) {
        throw Error('Missing required fields');
    }

    if(password !== confirmPassword) {
        throw Error('Passwords do not match');
    }

    const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    const data = await res.json();

    if(!res.ok) {
        throw Error(data.error);
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);

    return data;
}

export { loginUser, registerUser };