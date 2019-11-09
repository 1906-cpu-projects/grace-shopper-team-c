import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
  getProductsThunk,
  getUsersThunk,
  createUserThunk,
  attemptLogin,
  attemptSession,
  attemptLogout,
  addCartItemThunk,
  getOrdersThunk,
  createOrderThunk,
  updateOrderThunk,
  deleteOrderThunk,
  getCartThunk,
  deleteCartItemThunk
} from './thunk.js';
import { getCart, addCartItem, deleteCartItem, getGuestCart, addGuestItem, deleteGuestItem } from './action.js';
import { reducer/*, composeEnhancers*/ } from './reducer.js';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
  /*composeEnhancers(applyMiddleware(thunkMiddleware))*/
);

export default store;
export {
  getProductsThunk,
  getUsersThunk,
  getCart,
  addCartItem,
  deleteCartItem,
  getGuestCart,
  addGuestItem,
  deleteGuestItem,
  createUserThunk,
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
