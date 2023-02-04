import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const registerUser = async () => {
    await axios
      .post('api/auth/register', {
        username,
        firstname,
        lastname,
        email,
        password,
      })
      .then((res) => {
        const data = res.data;
        dispatch(setLogin({ user: data._id, token: data.token }));
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
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
    <div className="register">
      <div className="row align-items-start">
        <div
          className="col left register-form"
          style={{
            backgroundImage: `url("https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1200&fit=crop&crop=faces")`,
          }}
        >
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
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              placeholder="First Name"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              placeholder="Last Name"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
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
          <Link className="nav-link active" to="/login">
            <h6>Have an account? Login</h6>
          </Link>
          <input
            className="btn btn-primary"
            type="submit"
            value="Register"
            onClick={() => {
              registerUser();
            }}
          />
        </div>
        <div className="col right">
          <h1>Surge SE Internship</h1>
          <h3>March 2023</h3>
          <h4>Rasula Yadithya</h4>
        </div>
      </div>
    </div>
  );
};

export default Register;
