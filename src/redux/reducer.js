import {  combineReducers, } from 'redux';

import { SET_AUTH, GET_USERS, GET_PRODUCTS, GET_CART, ADD_CART, DELETE_CART, CREATE_USERS, UPDATE_USER } from './action.js'


const authenticateReducer = (state={}, action) => {
  if(action.type === SET_AUTH) {
    return action.auth
  }
  return state
}

const userReducer = (state=[], action)=>{
  switch (action.type){
    case GET_USERS :
      return action.users;
    case CREATE_USERS :
      return [...state, action.user];
    case UPDATE_USER :
      return state.map( user => user.id === action.user.id ? action.user : user );
    default: return state;
  }
}

const productReducer = (state=[], action)=>{
  if(action.type === GET_PRODUCTS){
    return action.products
  }
  return state
}

const cartReducer = (state=[], action)=> {
  switch (action.type){
    case GET_CART :
      return action.cart;
    case ADD_CART :
      return [...state, action.item];
    case DELETE_CART :
      return state.filter((item, idx) => idx !== action.idx);
    default: return state;
  }
}

const reducer = combineReducers({
  users: userReducer,
  products: productReducer,
  cart: cartReducer,
  auth: authenticateReducer
})

export { reducer }
