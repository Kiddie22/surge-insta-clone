const Post = (props) => {
  const { post } = props;

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

  return (
    <div className="card m-2">
      <img src={post.pictureUrl} className="card-img-top" />
      <div className="card-body">
        <div className="row align-items-start">
          <div className="col">
            <i className="bi bi-heart-fill px-1"></i>Likes
          </div>
          <div className="col">{post.username}</div>
          <div className="col">{`${getDays()} ago`}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
