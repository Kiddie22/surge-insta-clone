import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const loginUser = async () => {
    console.log(username);
    console.log(password);
    await axios
      .post('http://localhost:5000/api/auth/login', {
        username,
        password,
      })
      .then((res) => {
        const data = res.data;
        dispatch(setLogin({ user: data._id, token: data.token }));
        navigate('/');
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
        setPassword('');
      });
  };

  // const doSubmit = async () => {
  //   window.grecaptcha.ready(function () {
  //     window.grecaptcha
  //       .execute('6LdZgUskAAAAALsqK8LTRp1q-hwuV83QIfMhrv95', {
  //         action: 'submit',
  //       })
  //       .then(async function (grecaptcha) {
  //         // Add your logic to submit to your backend server here.
  //         await axios
  //           .post('/api/auth/login', {
  //             username: username,
  //             password: password,
  //             grecaptcha: grecaptcha,
  //           })
  //           .then((res) => {
  //             const data = res.data;
  //             dispatch(setLogin({ user: data._id, token: data.token }));
  //             navigate('/');
  //           })
  //           .catch((error) => {
  //             const element = document.getElementById('error-msg');
  //             while (element.firstChild) {
  //               element.firstChild.remove();
  //             }

  //             const mssg = document.createElement('p');
  //             const node = document.createTextNode(error.response.data.msg);
  //             mssg.appendChild(node);
  //             element.style.color = 'red';
  //             element.appendChild(mssg);
  //             setUsername('');
  //             setPassword('');
  //           });
  //       });
  //   });
  // };

  return (
    <div className="container login">
      <div className="row align-items-start">
        <div
          className="col login-form"
          style={{
            backgroundImage: `url("https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1200&fit=crop&crop=faces")`,
          }}
        >
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
              loginUser();
            }}
          />
        </div>
        <div className="col text-center">
          <h1>Surge SE Internship</h1>
          <h3>March 2023</h3>
          <h4>Rasula Yadithya</h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
