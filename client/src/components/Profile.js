import AddImage from './AddImage';

const Profile = (props) => {
  const { user } = props;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Profile</h1>
      <div
        style={{
          height: '100px',
          width: '100px',
        }}
      >
        <img
          src={user.profilePictureUrl}
          alt="profile picture of the user"
          height={'100px'}
          style={{
            borderRadius: '100px',
            border: 'solid black 1px',
          }}
        />
      </div>
      <h3>{`${user.firstname} ${user.lastname}`}</h3>
      <h6>{user.username}</h6>
      <AddImage user={user} />
    </div>
  );
};

export default Profile;
