import * as yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const registerSchema = yup.object().shape({
  username: yup.mixed().required('required'),
  firstname: yup.string().required('required'),
  lastname: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required').min(5),
});

const initialValuesRegister = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, onSubmitProps) => {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute('6LdZgUskAAAAALsqK8LTRp1q-hwuV83QIfMhrv95', {
          action: 'submit',
        })
        .then(async function (grecaptcha) {
          values.grecaptcha = grecaptcha;
          await axios
            .post('api/auth/register', values)
            .then((res) => {
              const data = res.data;
              console.log(data);
              onSubmitProps.resetForm();
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
            });
        });
    });
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
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
                  REGISTER
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
                    label="firstname"
                    onChange={handleChange}
                    value={values.firstname}
                    name="firstname"
                    error={
                      Boolean(touched.firstname) && Boolean(errors.firstname)
                    }
                    helperText={touched.firstname && errors.firstname}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    label="lastname"
                    onChange={handleChange}
                    value={values.lastname}
                    name="lastname"
                    error={
                      Boolean(touched.lastname) && Boolean(errors.lastname)
                    }
                    helperText={touched.lastname && errors.lastname}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    label="email"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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
                <Link className="nav-link active" to="/login">
                  <h6>Have an account? Login</h6>
                </Link>
                <Button type="submit" variant="contained">
                  REGISTER
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

export default RegisterForm;
