import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ users, products, cart, guestCart, auth, orders }) => {
  const order = orders.filter(order => order.userId === auth.id);
  const userCart =
    order.length !== 0 ? cart.filter(item => item.orderId === order[0].id) : [];
  return (
    <nav className='nav-wrapper'>
      <div className='container'>
        <NavLink to='/' className='brand-logo'>Home</NavLink>
        <ul className='right'>
          <li><NavLink to='/users'>Users ({users.length})</NavLink></li>
          <li><NavLink to='/products'>Products ({products.length})</NavLink></li>
          <NavLink to='/cart'><i className="medium material-icons">add_shopping_cart</i>Cart ({auth.name !== 'Guest' ? userCart.length : guestCart.length})</NavLink>
      {auth.name === 'Guest' || !auth.id ? (
        <NavLink to='/signup'>Sign Up</NavLink>
      ) : (
        <NavLink to='/profile'>Profile</NavLink>
      )}
        </ul>
      </div>
    </nav>
  );
};
const Nav = connect(({ users, products, cart, auth, orders, guestCart }) => {
  return {
    users,
    products,
    cart,
    guestCart,
    auth,
    orders
  };
})(_Nav);

export default Nav;
