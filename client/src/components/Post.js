import { useSelector } from 'react-redux';
import axios from 'axios';

const Post = (props) => {
  const { post, user } = props;
  const userId = user._id;
  const token = useSelector((state) => state.token);

  const getDays = () => {
    let today = new Date();
    let createdDate = new Date(post.createdAt);

    // To calculate the time difference of two dates
    var Difference_In_Time = today.getTime() - createdDate.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    Difference_In_Days = Math.ceil(Difference_In_Days);
    if (Difference_In_Days === 1) {
      return `${Difference_In_Days} day`;
    } else {
      return `${Difference_In_Days} days`;
    }
  };

  const likePost = async () => {
    await axios
      .put(
        `http://localhost:5000/api/posts/add/${post._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = async () => {
    await axios
      .put(
        `http://localhost:5000/api/posts/remove/${post._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card m-2">
      <img src={post.pictureUrl} className="card-img-top" />
      <div className="card-body">
        <div className="row align-items-start">
          {post.likes && post.likes[userId] == true ? (
            // if user has liked the post
            <button
              className="col"
              style={{ border: 'none', backgroundColor: 'transparent' }}
              onClick={() => unlikePost()}
            >
              <i className="bi bi-heart-fill px-1" style={{ color: 'red' }}></i>
              {post.likes && Object.keys(post.likes).length}
            </button>
          ) : (
            // if user has not liked the post
            <button
              className="col"
              style={{ border: 'none', backgroundColor: 'transparent' }}
              onClick={() => likePost()}
            >
              <i className="bi bi-heart-fill px-1"></i>
              {/* {post.likes ? post.likes.hasOwnProperty.length : '0'} */}
              {post.likes && Object.keys(post.likes).length}
            </button>
          )}
          <div className="col">{post.username}</div>
          <div className="col">{`${getDays()} ago`}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
