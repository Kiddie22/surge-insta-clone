import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReCAPTCHA from 'react-google-recaptcha';
import env from 'react-dotenv';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: authReducer,
});

// const onChange = (value) => {
//   console.log('Captcha value:', value);
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ReCAPTCHA sitekey={env.RECAPTCHA} onChange={onChange}>
    <Provider store={store}>
      <App />
    </Provider>
  // {/* </ReCAPTCHA> */}
);
