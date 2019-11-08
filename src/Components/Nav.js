import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ users, products, cart, auth, orders }) => {
  const order = orders.filter(order => order.userId === auth.id);
  const userCart =
    order.length !== 0 ? cart.filter(item => item.orderId === order[0].id) : [];
  console.log('nav: ', auth);
  const guestCart = auth.cart;
  console.log(guestCart.length);
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/users'>Users ({users.length})</NavLink>
      <NavLink to='/products'>Products ({products.length})</NavLink>
      <NavLink to='/cart'>Cart ({userCart.length})</NavLink>
      {!auth.id ? (
        <NavLink to='/signup'>Sign Up</NavLink>
      ) : (
        <NavLink to='/profile'>Profile</NavLink>
      )}
    </nav>
  );
};
const Nav = connect(({ users, products, cart, auth, orders }) => {
  return {
    users,
    products,
    cart,
    auth,
    orders
  };
})(_Nav);

export default Nav;
