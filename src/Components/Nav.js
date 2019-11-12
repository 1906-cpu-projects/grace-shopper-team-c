import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ users, products, cart, guestCart, auth, orders }) => {
  const order = orders.filter(order => order.userId === auth.id);
  const userCart =
    order.length !== 0 ? cart.filter(item => item.orderId === order[0].id) : [];
  return (
    <nav>
      <div className='nav-wrapper'>
        <NavLink to='/' className='brand-logo'><i className="material-icons left">build</i>Grace Shopper</NavLink>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li><NavLink to='/users'><i className="material-icons left">person_outline</i>Users <span className='new badge blue'>{users.length}</span></NavLink></li>
          <li><NavLink to='/products'>Products <span className='new badge blue'>{products.length}</span></NavLink></li>
          <li><NavLink to='/cart'><i className="medium material-icons right">add_shopping_cart</i>Cart ({auth.name !== 'Guest' ? userCart.length : guestCart.length})</NavLink></li>
      {auth.name === 'Guest' || !auth.id ? (
        <li><NavLink to='/signup'>Sign Up</NavLink></li>
      ) : (
        <li><NavLink to='/profile'>Profile</NavLink></li>
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
