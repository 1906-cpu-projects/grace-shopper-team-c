import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { attemptLogout } from './redux/store';

class _UserProfile extends Component {
  render(){
    const { users, auth, logout } = this.props;

    if(users.length === 0){
      return (
        <div className='userProfileContainer'>
          <h1>Account Information</h1>
          <h3>Loading...</h3>
        </div>
      );
    }

    const user = users.find(user=> user.id === auth.id);

    //if guest tries to access /profile, redirect to home page
    if(!auth.id){
      return (
        <Redirect to='/' />
      );
    }

    return (
      <div className='userProfileContainer'>
        <h1>Account Information</h1>
        <h3>Name: {user.name} </h3>
        <h3>Email: {user.email} </h3>
        <div><Link to='/settings/profile'>Edit profile</Link></div>
        <br></br>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = ({ users, auth })=> ({ users, auth });

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(attemptLogout())
  }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile);

export default UserProfile;
