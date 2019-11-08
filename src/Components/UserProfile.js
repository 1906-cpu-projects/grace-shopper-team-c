import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogout } from '../redux/store';

class _UserProfile extends Component {
  render(){
    const { auth, logout, users, products } = this.props;

    //if guest tries to access /profile, link to home page
    if(!auth.id){
      return (
        <div>
          <h3>Hello guest,</h3>
          <Link to='/'>Return Home</Link>
        </div>
      );
    }

    //loading
    if(users.length === 0 || products.length === 0){
      return <h1>loading...</h1>
    }

    //find current user
    const user = users.find( user => user.id === auth.id);
    console.log('user in UserProfile', user);
    return (
      <div className='userProfileContainer'>
        <h1>Account Information</h1>
        <h3>Name: {user.name} </h3>
        <h3>Email: {user.email} </h3>
        <h3>Order History</h3>
        <ul>
          {
            !user.orders || user.orders.length === 0 ?
              <div>No Orders</div> :
            user.orders.map( order =>
              <li key={order.id}>
                <b>Order:</b> <Link to={`/orders/${order.id}`}> #{order.id}</Link>
                <span> <b>Total:</b> ${ order.lineItems.map(
                  lineItem =>
                    products.find(product => product.id === lineItem.productId).price * lineItem.quantity)
                      .reduce((acc, curr)=> acc + curr, 0)
                      .toFixed(2)}
                </span>
                {
                  !order.complete ?
                    <span> <b>Status:</b> In Progess</span> :
                    <span> <b>Status:</b> Complete</span>
                }
              </li>
            )
          }
        </ul>
        <div><Link to='/settings/profile'>Edit profile</Link></div>
        <br/>
        <Link to='/'><button onClick={logout}>Logout</button></Link>
        <br/><br/>
        <div><Link to='/settings/deactivate'>Deactivate Account</Link></div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, users, products })=> ({ auth, users, products });

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(attemptLogout())
  }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile);

export default UserProfile;
