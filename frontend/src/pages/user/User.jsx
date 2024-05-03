import React from 'react'
import { useParams } from 'react-router-dom';

const User = ({match}) => {
    const { id } = useParams();
    return (
        <div>
            <h1>User with id: {id}</h1>
        </div>
    )
}

export default User

