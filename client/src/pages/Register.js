import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const registerUser = async () => {
    await axios
      .post('http://localhost:5000/api/auth/register', {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        const data = res.data;
        dispatch(setLogin({ user: data._id, token: data.token }));
        navigate.push(`/`);
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
        setEmail('');
        setPassword('');
      });
  };

  return (
    <div className="container">
      <h1 className="display-3">Register</h1>
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
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        value="Register"
        onClick={() => {
          registerUser();
        }}
      />
    </div>
  );
};

export default Register;
