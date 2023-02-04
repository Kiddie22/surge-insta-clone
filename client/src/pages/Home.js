import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Post from '../components/Post';
import Profile from '../components/Profile';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const userId = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

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
    if (!token) {
      navigate('/login');
    }
    if (token) {
      fetchPosts();
      fetchUser();
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <img
            className="mt-3"
            src="assets/insta.png"
            alt="instagram icon"
            style={{ width: '100px' }}
          />
        </Col>
        <Col>
          {posts &&
            posts.map((post) => {
              return (
                <div key={post._id}>
                  <Post post={post} user={user} />
                </div>
              );
            })}
        </Col>
        <Col>
          <Profile user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
