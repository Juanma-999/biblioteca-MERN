import { useParams } from 'react-router-dom';
import { getUserById } from "../../controller/usersController";
import { useEffect, useState } from "react";
import { getDogsByUser } from "../../controller/dogsController";
import Dog from "../../components/Dog";
import { FaSpinner } from 'react-icons/fa';

const User = ({ match }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getUserById(id);
        setUser(userInfo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchDogsByUser = async () => {
      try {
        const response = await getDogsByUser(id);
        console.log("response.data: ", response.data);
        setDogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dogs:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchDogsByUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <FaSpinner className="animate-spin text-5xl" />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <section className="card">
        {user && dogs && (
          <div>
            <p>
              <b>Username:</b> {user.username}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <h2 className="title my-1">Dogs owned by {user.username}:</h2>
            <div className="dog-container">
            {dogs && dogs.map((dog) => (
              <div key={dog._id}>
                <Dog dog={dog} />
              </div>
            ))}
          </div>
          </div>
        )}
      </section>
    </div>
  );
};


export default User

