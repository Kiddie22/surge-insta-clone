import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    fetchPosts();
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
            return <Post post={post} />;
          })}
        </div>
        <div className="col-4">One of three columns</div>
      </div>
    </div>
  );
};

export default Home;
