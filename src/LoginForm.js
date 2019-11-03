import React, { Component } from 'react';
import { connect } from 'react-redux';
import { attemptLogin } from './redux/store';

class _LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(ev) {
    this.setState({ [ ev.target.name ]: ev.target.value });
  }

  login(ev) {
    ev.preventDefault();
    this.props.attemptLogin(this.state);
  }

  render() {
    const { email, password } = this.state;
    const { onChange, login } = this;

    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={ login }>
          <div>
            <input placeholder='email' value={ email } type='email' name='email' onChange={ onChange } />
          </div>
          <div>
            <input placeholder='password' value={ password } type='password' name='password' onChange={ onChange } />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const LoginForm = connect(null, (dispatch) => {
  return {
    attemptLogin: (user) => dispatch(attemptLogin(user))
  }
})(_LoginForm);

export default LoginForm;

