import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header />
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Router>
);
