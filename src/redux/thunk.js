import axios from 'axios';

import {
  setAuth,
  logOutAuth,
  keepSession,
  getUsers,
  createUsers,
  deleteUser,
  updateUser,
  getProducts,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getCart,
  addCartItem,
  deleteCartItem
} from './action.js';

// Auth thunks
const attemptLogin = user => {
  return async dispatch => {
    const auth = (await axios.post('/api/login', {
      email: user.email,
      password: user.password
    })).data;
    dispatch(setAuth(auth));
    //history.push('/')
  };
};

const attemptLogout = () => {
  return async dispatch => {
    await axios.delete('/api/logout');
    dispatch(logOutAuth());
  };
};

const attemptSession = () => {
  return async dispatch => {
    const auth = (await axios.get('/api/session')).data;
    dispatch(keepSession(auth));
  };
};

//User thunks
const getUsersThunk = () => {
  return async dispatch => {
    const response = (await axios.get('/api/users')).data;
    dispatch(getUsers(response));
  };
};
const createUserThunk = user => {
  return async dispatch => {
    const response = (await axios.post('/api/users', user)).data;
    dispatch(createUsers(response));
  };
};
const updateUserThunk = user => {
  return async dispatch => {
    try {
      const updatedUser = (await axios.put(`/api/users/${user.id}`, user)).data;
      dispatch(updateUser(updatedUser));
    } catch (ex) {
      console.log(ex);
    }
  };
};
const deleteUserThunk = user => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${user.id}`, user);
      dispatch(deleteUser(user));
    } catch (ex) {
      console.log(ex);
    }
  };
};

//Product thunks
const getProductsThunk = () => {
  return async dispatch => {
    const response = (await axios.get('/api/products')).data;
    dispatch(getProducts(response));
  };
};

//Order thunks
const getOrdersThunk = () => {
  return async dispatch => {
    const response = (await axios.get('/api/orders')).data;
    dispatch(getOrders(response));
  };
};

const createOrderThunk = order => {
  return async dispatch => {
    const response = (await axios.post('/api/orders', order)).data;
    console.log(order);
    dispatch(createOrder(response));
  };
};

const updateOrderThunk = order => {
  return async dispatch => {
    const response = (await axios.put(`/api/orders/${order.id}`, order)).data;
    dispatch(updateOrder(response));
  };
};

const deleteOrderThunk = order => {
  return async dispatch => {
    const response = (await axios.delete(`/api/orders/${order.id}`)).data;
    dispatch(deleteOrder(response));
  };
};

//LineItem thunk
const getCartThunk = () => {
  return async dispatch => {
    const response = (await axios.get('/api/lineItems')).data;
    dispatch(getCart(response));
  };
};

const addCartItemThunk = item => {
  return async dispatch => {
    const response = (await axios.post('/api/lineItems', item)).data;
    console.log('item', item);
    dispatch(addCartItem(response));
  };
};

const deleteCartItemThunk = item => {
  return async dispatch => {
    await axios.delete(`/api/lineItems/${item.id}`);
    dispatch(deleteCartItem(item));
  };
};

export {
  getProductsThunk,
  getUsersThunk,
  createUserThunk,
  updateUserThunk,
  deleteUserThunk,
  attemptLogin,
  attemptSession,
  attemptLogout,
  getOrdersThunk,
  createOrderThunk,
  updateOrderThunk,
  deleteOrderThunk,
  getCartThunk,
  addCartItemThunk,
  deleteCartItemThunk
};
