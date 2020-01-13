import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserThunk, attemptSession } from '../redux/thunk';
import { Redirect, Link } from 'react-router-dom';


class _UpdateUserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.auth.name,
      email: props.auth.email,
      error: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
  }

  update(){
    const { auth } = this.props;
    try {
      this.props.update({...this.state, id: auth.id});
    }
    catch(ex){
      this.setState({ error: ex });
    }
  }
  handleChange(ev){
    this.setState({ error: ''});
    this.setState(
      { [ev.target.name]: ev.target.value }
      );
  }
  render(){
    const { auth, attemptSession } = this.props;
    const { handleChange, update } = this;
    const { name, email, error } = this.state;

    //guest or loading
    if (!auth.id) {
      return (
        <Redirect to='/profile' />
      );
    }

    return (
      <div className='editProfileContainer'>
        <h1>Edit profile</h1>
        <h3>Name: { auth.name }</h3>
        <h3>Email: { auth.email }</h3>
        <Link to='/profile'>return to profile</Link>

        <form className='userForm' onSubmit={ attemptSession }>
          <div>
            User Name: <input type='text' name='name' value={ name } onChange={ handleChange }></input>
          </div>
          <br/>
          <div>
            Email: <input type='email' name='email' value={ email } onChange={ handleChange }></input>
          </div>
          <br/>
          { !!error && <div className='error'>{ error }</div> }
          <button disabled={!this.state.name || !this.state.email } onClick={ update }>Update</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth })=> ({ auth });

const mapDispatchToProps = (dispatch)=> {
  return {
    update: (user)=> dispatch(updateUserThunk(user)),
    attemptSession: () => attemptSession()
  };
}

const UpdateUserForm = connect(mapStateToProps, mapDispatchToProps)(_UpdateUserForm);

export default UpdateUserForm;
