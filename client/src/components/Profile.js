import AddImage from './AddImage';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../state';

const Profile = (props) => {
  const { user } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: '100px',
          width: '100px',
        }}
      >
        <img
          src={user.profilePictureUrl}
          alt="profile pic of the user"
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
      <Button
        onClick={() => {
          dispatch(setLogout());
          navigate('/login');
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Profile;
