const getUserById = async(id) => {
    if(!id) {
        throw Error('Missing required field');
    }

    const res = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });

    const data = await res.json();

    if(!res.ok) {
        throw Error(data.error);
    }

    return data;
}

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

    const base64Url = data.token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const parsedToken = JSON.parse(window.atob(base64));
    localStorage.setItem('userId', parsedToken._id);
}

const registerUser = async (username, email, password, confirmPassword) => {
    if (!email || !password || !confirmPassword || !username) {
        throw Error('Missing required fields');
    }
    if (password !== confirmPassword) {
        throw Error('Passwords do not match');
    }
    const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
    });
    const data = await res.json();
    if (!res.ok) {
        throw Error(data.error);
    }
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);
    const base64Url = data.token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const parsedToken = JSON.parse(window.atob(base64));
    localStorage.setItem('userId', parsedToken._id);
    return data;
};

export { getUserById, loginUser, registerUser };

