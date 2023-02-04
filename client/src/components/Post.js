import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '../state';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = (props) => {
  const { post, user } = props;
  const userId = user._id;
  const token = useSelector((state) => state.token);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const getDays = () => {
    let today = new Date();
    let createdDate = new Date(post.createdAt);
    // To calculate the time difference of two dates
    var timeDifference = today.getTime() - createdDate.getTime();
    // To calculate the no. of days between two dates
    var dayDifference = timeDifference / (1000 * 3600 * 24);
    dayDifference = Math.ceil(dayDifference);
    return dayDifference;
  };

  const likePost = async () => {
    await axios
      .put(
        `api/posts/add/${post._id}`,
        {},
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setPost({ post: res.data }));
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = async () => {
    await axios
      .put(
        `/api/posts/remove/${post._id}`,
        {},
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setPost({ post: res.data }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="text-center card">
      <img src={post.pictureUrl} className="card-img-top" />
      <CardBody>
        <Row>
          {post.likes && post.likes[userId] == true ? (
            // if user has liked the post
            <Col>
              <button
                className="col"
                style={{ border: 'none', backgroundColor: 'transparent' }}
                onClick={() => unlikePost()}
              >
                <i
                  className="bi bi-heart-fill px-1"
                  style={{ color: 'red' }}
                ></i>
                {post.likes && Object.keys(post.likes).length}
              </button>
            </Col>
          ) : (
            // if user has not liked the post
            <Col>
              <button
                className="col"
                style={{ border: 'none', backgroundColor: 'transparent' }}
                onClick={() => likePost()}
              >
                <i className="bi bi-heart-fill px-1"></i>
                {/* {post.likes ? post.likes.hasOwnProperty.length : '0'} */}
                {post.likes && Object.keys(post.likes).length}
              </button>
            </Col>
          )}
          <Col>{post.username}</Col>
          <Col>{`${getDays()}d`}</Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Post;
