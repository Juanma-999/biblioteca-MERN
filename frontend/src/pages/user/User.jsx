import React from 'react'
import { useParams } from 'react-router-dom';
import { getUserById } from "../../controller/usersController";
import { useEffect, useState } from "react";

const User = ({ match }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserById(id);
      setUser(userInfo);
    };
    fetchUser();
  }, [id]);

  return (
    <div>
      <h1>User with id: {id}</h1>
      {user && (
        <div>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
        </div>
      )}
    </div>
  );
};


export default User

