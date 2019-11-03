import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route} from 'react-router-dom';
import { Provider, connect } from 'react-redux';
const root = document.querySelector('#root')

import Nav from './Nav';
import store, {getUsersThunk, getProductsThunk} from './redux/store';
import Users from './Users';
import SignUp from './SignUp';
import UserProfile from './UserProfile';
import UpdateUserForm from './UpdateUserForm';
import Products from './Products';
import Home from './Home';
import Cart from './Cart';
import { attemptSession } from './redux/store';


class _App extends Component{
  componentDidMount(){
    this.props.getUsers();
    this.props.getProducts();
    this.props.attemptSession()
      .catch(ex => console.log(ex))
  }
  render(){
    const { loggedIn } = this.props;
    return (
      <HashRouter>
        <Route component={Nav} />
        <Route path='/' component={Home} exact />
        <Route path='/users' component={Users} />
        <Route path='/signup' component={SignUp} />
        <Route path='/profile' component={UserProfile} />
        <Route path='/settings/profile' component={UpdateUserForm} />
        <Route path='/products' component={Products} />
        <Route path='/cart' component={Cart} />
      </HashRouter>
    )
  }
}
const App = connect(({ auth }) => {
  return {
    loggedIn: !!auth.id
  }
}, (dispatch)=>{
  return {
    getUsers: ()=> dispatch(getUsersThunk()),
    getProducts: ()=> dispatch(getProductsThunk()),
    attemptSession: () => dispatch(attemptSession())
  }
})(_App);

render(<Provider store={store}><App /></Provider>, root);
