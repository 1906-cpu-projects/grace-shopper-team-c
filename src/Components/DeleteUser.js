import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { attemptLogout } from '../redux/store';
import { deleteUserThunk } from '../redux/thunk';

const _DeleteUser = ({auth, users, logout, destroy})=> {

  if(!auth.id){
    return (
      <Redirect to='/' />
    );
  }

  if(users.length === 0){
    return (
      <h3>Loading...</h3>
    );
  }

  const user = users.find( user => user.id === auth.id);

  return (
    <div>
      <h1>Delete Account, {auth.name}</h1>
      <h3>Are you sure you want to deactivate your account?</h3>
      <div>Note: this will delete all account information, including order history.</div>
      <br/>
      <button onClick={ ()=> {
        logout();
        destroy(user);
      }}>Deactivate Account</button>
      <br/><br/>
      <Link to='/profile'>return to profile</Link>
    </div>
  );
}


const mapStateToProps = ({ auth, users })=> ({ auth, users });

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(attemptLogout()),
    destroy: (user)=> dispatch(deleteUserThunk(user))
  }
}

const DeleteUser = connect(mapStateToProps, mapDispatchToProps)(_DeleteUser);

export default DeleteUser;
