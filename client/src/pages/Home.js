import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatePosts } from '../state';
import axios from 'axios';
import Post from '../components/Post';
import Profile from '../components/Profile';
import { Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Home = () => {
  const [user, setUser] = useState({});
  const [type, setType] = useState('Created Date');
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPosts = async (order) => {
    setIsLoading(true);
    let endpoint = '';
    if (order === 'date') {
      endpoint = 'api/posts/';
    } else {
      endpoint = 'api/posts/?search=likes';
    }
    await axios
      .get(endpoint, {
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
              <div>
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button
                    onClick={() => {
                      fetchPosts('date');
                    }}
                  >
                    Created Date
                  </Button>
                  <Button
                    onClick={() => {
                      fetchPosts('likes');
                    }}
                  >
                    Likes
                  </Button>
                </ButtonGroup>
              </div>
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
