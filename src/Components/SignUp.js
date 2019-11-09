import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {createUserThunk} from '../redux/store'

class _SignUp extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
    this.create = this.create.bind(this)
  }

  create(){
    const theState = {name: this.state.name, email: this.state.email, password: this.state.password}
    try{
      if(!theState.email.includes('@')){
        throw 'ERROR: Must be a valid email with an @'
      }
    this.props.toCreate(theState);
    }catch(ex){
      alert(ex)
    }
  }

  render(){
    const { auth } = this.props;
    //if logged in user attemps to access /signup, redirect to /profile
    if(auth.name !== 'Guest'){
      return (<Redirect to='/profile' />)
    }

    return (
      <div>
        <br></br>
        <div>Already have an account? <span><Link to='/'>log in</Link></span></div>
        <form onSubmit={ev => ev.preventDefault()} className='userForm' >
        <div><h1>Create an Account</h1></div>
          <div>User Name: <input value={this.state.name} placeholder='enter name here' onChange={ev => this.setState({name: ev.target.value})} /></div>
          <br/>
          <div>Email: <input value={this.state.email} placeholder='enter email here' onChange={ev => this.setState({email: ev.target.value})} /></div>
          <br/>
          <div>Password: <input type='password' value={this.state.password} placeholder='enter email here' onChange={ev => this.setState({password: ev.target.value})} /></div>
          <br/>
          <Link to='/' ><button disabled={!this.state.name || !this.state.email || !this.state.password } onClick={this.create} >Sign Up</button></Link>
        </form>
      </div>
    )
  }
}
const SignUp = connect(({users, auth})=>{
  return {
    users,
    auth
  }
}, (dispatch)=>{
  return {
    toCreate: (user) => dispatch(createUserThunk(user)),
  }
})(_SignUp)

export default SignUp
