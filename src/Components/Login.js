import React from 'react';
import { connect } from 'react-redux';
import { attemptLogout } from '../redux/store';

const _Login = ({ auth, attemptLogout }) =>
  <div>
    <div>
      Welcome, { auth.name }
    </div>
    <button onClick={ attemptLogout }>Logout</button>
  </div>

const Login = connect(({ auth }) => {
  return { auth }
}, (dispatch) => {
  return {
    attemptLogout: () => dispatch(attemptLogout())
  }
})(_Login)

export default Login
