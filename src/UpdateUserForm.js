import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserThunk } from './redux/thunk';


class _UpdateUserForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
  }
  componentDidMount(){
    const { currentUser } = this.props;
    if(!currentUser.name){
      return null;
    }
    this.setState({
      name: currentUser.name,
      email: currentUser.email,
      password: currentUser.password,
      error: ''
    })
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
    const { auth, users } = this.props;
    const { handleChange, update } = this;
    const { error } = this.state;

    if (!auth.id || users.length === 0) {
      return (
        <h1>loading...</h1>
      );
    }

    return (
      <div>
        <h2>Edit profile</h2>
        <form className='userForm' onSubmit={ ev => ev.preventDefault()}>
          User Name: <input type='text' name='name' placeholder={ auth.name } onChange={ handleChange }></input>
          Email: <input type='email' name='email' placeholder={ auth.email } onChange={ handleChange }></input>
          Password: <input type='password' name='password' placeholder='change password' onChange={ handleChange }></input>
          { !!error && <div className='error'>{ error }</div> }
          <button onClick={ update }>Update</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ users, auth })=> {
  const currentUser = users.find( user => user.id === auth.id);
  return {
    auth,
    users,
    currentUser
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    update: (user)=> dispatch(updateUserThunk(user))
  }
}

const UpdateUserForm = connect(mapStateToProps, mapDispatchToProps)(_UpdateUserForm);

export default UpdateUserForm;
