import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatePosts } from '../state';
import axios from 'axios';
import Post from '../components/Post';
import Profile from '../components/Profile';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPosts = async (req, res) => {
    setIsLoading(true);
    await axios
      .get('api/posts/', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setStatePosts({ posts: res.data }));
        setIsLoading(false);
      });
  };

  const fetchUser = async (req, res) => {
    await axios.get(`api/users/${userId}`).then((res) => {
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
    <>
      {isLoading ? (
        <div className="spinner-container center">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="home" style={{ border: 'solid black 1px' }}>
          <Row>
            <Col id="insta-image">
              <img
                src="assets/insta.png"
                alt="instagram icon"
                style={{ width: '100px' }}
              />
            </Col>
            <Col className="scrollable">
              {posts &&
                posts.map((post) => {
                  return (
                    <div key={post._id}>
                      <Post post={post} user={user} />
                    </div>
                  );
                })}
            </Col>
            <Col id="profile-form">
              <Profile user={user} />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Home;
