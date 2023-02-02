import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const doSubmit = async () => {
    await axios
      .post('http://localhost:5000/api/auth/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        const data = res.data;
        dispatch(setLogin({ user: data._id, token: data.token }));
        navigate('/');
      })
      .catch((error) => {
        const element = document.getElementById('error-msg');
        while (element.firstChild) {
          element.firstChild.remove();
        }

        const mssg = document.createElement('p');
        const node = document.createTextNode(error.response.data.msg);
        mssg.appendChild(node);
        element.style.color = 'red';
        element.appendChild(mssg);
        setUsername('');
        setPassword('');
      });
  };

  return (
    <div className="container">
      <h1 className="display-3">Login</h1>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="error-msg"></div>
      <input
        className="btn btn-primary"
        type="submit"
        value="Login"
        onClick={() => {
          doSubmit();
        }}
      />
    </div>
  );
};

export default Login;
