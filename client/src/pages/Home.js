import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Post from '../components/Post';
import Profile from '../components/Profile';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const userId = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const fetchPosts = async (req, res) => {
    await axios
      .get('http://localhost:5000/api/posts/', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
      });
  };

  const fetchUser = async (req, res) => {
    await axios.get(`http://localhost:5000/api/users/${userId}`).then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  return (
    <div className="container text-center">
      <div className="row align-items-start">
        <div className="col-4">
          <img
            className="mt-3"
            src="assets/insta.png"
            alt="instagram icon"
            style={{ width: '100px' }}
          />
        </div>
        <div className="col-4">
          {posts.map((post) => {
            console.log(post);
            return (
              <div key={post._id}>
                <Post post={post} />
              </div>
            );
          })}
        </div>
        <div className="col-4">
          <Profile user={user} />
        </div>
      </div>
    </div>
  );
};

export default Home;
