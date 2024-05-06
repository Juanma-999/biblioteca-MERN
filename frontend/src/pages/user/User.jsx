import { useParams } from 'react-router-dom';
import { getUserById } from "../../controller/usersController";
import { useEffect, useState } from "react";
import { Dog } from '../../../../backend/models/dogModel';

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
    <div className="flex justify-center">
      <section className="card">
        <h1>User with id: {id}</h1>
        {user && (
          <div>
            <p>
              <b>Username:</b> {user.username}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};


export default User

