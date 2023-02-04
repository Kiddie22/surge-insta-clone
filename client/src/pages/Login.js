import * as yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const loginSchema = yup.object().shape({
  username: yup.mixed().required('required'),
  password: yup.string().required('required'),
});

const initialValuesLogin = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, onSubmitProps) => {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute('6LdZgUskAAAAALsqK8LTRp1q-hwuV83QIfMhrv95', {
          action: 'submit',
        })
        .then(async function (grecaptcha) {
          let username = values.username;
          let password = values.password;
          await axios
            .post('/api/auth/login', {
              username,
              password,
              grecaptcha,
            })
            .then((res) => {
              const data = res.data;
              console.log(data);
              onSubmitProps.resetForm();
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
            });
        });
    });
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <div className="register">
          <div className="row align-items-start">
            <div
              className="col left register-form"
              style={{
                backgroundImage: `url("https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1200&fit=crop&crop=faces")`,
              }}
            >
              <form onSubmit={handleSubmit}>
                <Typography variant="h2" gutterBottom>
                  LOGIN
                </Typography>
                <div className="mb-3">
                  <TextField
                    label="username"
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    error={
                      Boolean(touched.username) && Boolean(errors.username)
                    }
                    helperText={touched.username && errors.username}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    type="password"
                    label="password"
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                  />
                </div>
                <div id="error-msg"></div>
                <Link className="nav-link active" to="/register">
                  <h6>New user? Register</h6>
                </Link>
                <Button type="submit" variant="contained">
                  LOGIN
                </Button>
                <div id="error-msg"></div>
              </form>
            </div>

            <div className="col right">
              <h1>Surge SE Internship</h1>
              <h3>March 2023</h3>
              <h4>Rasula Yadithya</h4>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
