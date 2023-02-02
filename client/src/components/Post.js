const Post = (props) => {
  const { post } = props;
  return (
    <div className="card m-2">
      <img src={post.pictureUrl} className="card-img-top" />
      <div className="card-body">
        <div className="row align-items-start">
          <div className="col">
            <i className="bi bi-heart-fill px-1"></i>Likes
          </div>
          <div className="col">{post.username}</div>
          <div className="col">Posted Date</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
