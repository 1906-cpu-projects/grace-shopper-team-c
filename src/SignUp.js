import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {createUserThunk} from './redux/store'

class _User extends Component{
  constructor(){
    super();
    this.state={
      error: ''
    }
    this.create = this.create.bind(this)
  }

  create(){
    const theState = {name: this.state.name, email: this.state.email, password: this.state.password}
    try{
      if(theState.name === undefined){
        throw 'ERROR: Username is required'
      }
      if(theState.email === undefined){
        throw 'ERROR: Email is required'
      }
      if(!theState.email.includes("@")){
        throw 'ERROR: Must be a valid email with an @'
      }
      if(theState.password === undefined){
        throw 'ERROR: Must have a valid password'
      }
    this.props.toCreate(theState);
    } catch(ex){
      alert(ex)
    }
  }

  render(){
    return (
      <div>
        <form onSubmit={ev => ev.preventDefault()} className='userForm' >
          <div>User Name: <input value={this.state.name} placeholder='enter name here' onChange={ev => this.setState({name: ev.target.value})} /> * Must have a Username</div>
          <br/>
          <div>Email: <input value={this.state.email} placeholder='enter email here' onChange={ev => this.setState({email: ev.target.value})} /> * Must have a valid email</div>
          <br/>
          <div>Password: <input type='password' value={this.state.password} placeholder='enter email here' onChange={ev => this.setState({password: ev.target.value})} /> * Must have a password</div>
          <br/>
          <Link to='/users' ><button disabled={ !this.state.name || !this.state.email || !this.state.password } onClick={this.create} >Add User</button></Link>
        </form>
      </div>
    )
  }
}
const User = connect(({users})=>{
  return {
    users,
  }
}, (dispatch)=>{
  return {
    toCreate: (user) => dispatch(createUserThunk(user)),
  }
})(_User)

export default User
