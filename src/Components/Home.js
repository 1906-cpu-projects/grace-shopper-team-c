
import React from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import LoginForm from './LoginForm';
import Login from './Login';
import { Link } from 'react-router-dom';

const _Home = ({ auth }) => {
  return (
    <div>
      {
        auth.name === 'Guest' ?
        (
          <div>
            <LoginForm />
            <div>Don't have an account? <Link to='/signup'>Sign up</Link></div>
          </div>
        )
        : <Login />
      }
      <br/>
      <Search />
    </div>
  );
};

const Home = connect(({ auth }) => {
  return { auth }
})(_Home);

export default Home;
