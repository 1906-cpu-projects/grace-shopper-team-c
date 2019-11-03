import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({users, products, cart, auth}) => {
  return (
    <nav>
      <NavLink to='/' >Home</NavLink>
      <NavLink to='/users' >Users ({users.length})</NavLink>
      <NavLink to='/products' >Products ({products.length})</NavLink>
      <NavLink to='/cart' >Cart ({cart.length})</NavLink>
      {
        !auth.id ? <NavLink to='/signup' >Sign Up</NavLink> : <NavLink to='/profile' >Profile</NavLink>
      }
    </nav>
  )
};
const Nav = connect(state => state)(_Nav);

export default Nav
