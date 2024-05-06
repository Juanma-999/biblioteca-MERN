import { useParams } from 'react-router-dom';
import { getUserById } from "../../controller/usersController";
import { useEffect, useState } from "react";
import { getDogsByUser } from "../../controller/dogsController";
import Dog from "../../components/Dog";

const User = ({ match }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserById(id);
      setUser(userInfo);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchDogsByUser = async () => {
      try {
        const response = await getDogsByUser(id);
        setDogs(response.data);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    if (id) {
      fetchDogsByUser();
    }
  }, [id]);

  return (
    <div className="flex justify-center">
      <section className="card">
        <h1>User with id: {id}</h1>
        {user && dogs && (
          <div>
            <p>
              <b>Username:</b> {user.username}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <h2 className="title my-1">Dogs owned by {user.username}:</h2>
            <ul>
            {dogs && dogs.map((dog) => (
              <li key={dog._id}>
                <Dog dog={dog} />
              </li>
            ))}
          </ul>
          </div>
        )}
      </section>
    </div>
  );
};


export default User

