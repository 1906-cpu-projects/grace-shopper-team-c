import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"

const GET_USERS = 'GET_USERS'
const CREATE_USERS = 'CREATE_USERS'
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_CART = 'GET_CART'
const ADD_CART = 'ADD_CART'
const DELETE_CART = 'DELETE_CART'
const SET_AUTH = 'SET_AUTH';

const authenticateReducer = (state={}, action) => {
  if(action.type === SET_AUTH) {
    return action.auth
  }
  return state
}

const userReducer = (state=[], action)=>{
  if(action.type === GET_USERS){
    return action.users
  }
  if(action.type === CREATE_USERS){
    return [...state, action.user]
  }
  return state
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

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

//action creators
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const logOutAuth = () => ({ type: SET_AUTH, auth: {} });
const keepSession = (auth) => ({ type: SET_AUTH, auth });
const getUsers = (users) => ({type: GET_USERS, users});
const createUsers = (user) => ({type: CREATE_USERS, user});
const getProducts = (products) => ({type: GET_PRODUCTS, products});
const getCart = (cart)=> ({ type: GET_CART, cart});
const addCartItem = (item)=> {
  return { type: ADD_CART, item }
};
const deleteCartItem = (idx)=> ({ type: DELETE_CART, idx});

// Auth thunks
const attemptLogin = (user) => {
  return async (dispatch) => {
    try {
      const auth = (await axios.post('/api/login', { email: user.email, password: user.password })).data
      dispatch(setAuth(auth))
      //history.push('/')
    }
    catch(ex){
      console.log(ex); //throw(ex)?
    }
  }
}

const attemptLogout = () => {
return async (dispatch) => {
    try {
      await axios.delete('/api/logout')
      dispatch(logOutAuth())
    }
    catch(ex){
      console.log(ex);
    }
  }
}

const attemptSession = () => {
  return async (dispatch) => {
    try {
      const auth = (await axios.get('/api/session')).data
      dispatch(keepSession(auth))
    }
    catch(ex){
      console.log(ex);
    }
  }
}

//User thunks
const getUsersThunk = ()=>{
  return async (dispatch)=>{
    try {
      const response = (await axios.get('/api/users')).data;
      dispatch(getUsers(response))
    }
    catch(ex){
      console.log(ex);
    }
  }
}
const createUserThunk = (user) => {
  return async (dispatch)=> {
    try {
      const response = (await axios.post('/api/users', user)).data;
      dispatch(createUsers(response));
    }
    catch(ex){
      console.log(ex);
    }
  }
}

//Product thunks
const getProductsThunk = ()=>{
  return async (dispatch)=>{
    try {
      const response = (await axios.get('/api/products')).data;
      dispatch(getProducts(response));
    }
    catch(ex){
      console.log(ex);
    }
  }
}


export default store;
export {getProductsThunk, getUsersThunk, getCart, addCartItem, deleteCartItem, createUserThunk, attemptLogin, attemptSession, attemptLogout}
