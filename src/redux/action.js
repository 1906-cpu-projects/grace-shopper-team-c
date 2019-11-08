const GET_USERS = 'GET_USERS';
const CREATE_USERS = 'CREATE_USERS';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_CART = 'GET_CART';
const ADD_CART = 'ADD_CART';
const DELETE_CART = 'DELETE_CART';
const SET_AUTH = 'SET_AUTH';
const GET_ORDERS = 'GET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

//action creators

//sessions
const setAuth = auth => ({ type: SET_AUTH, auth });
const logOutAuth = () => ({ type: SET_AUTH, auth: {} });
const keepSession = auth => ({ type: SET_AUTH, auth });

//users
const getUsers = users => ({ type: GET_USERS, users });
const createUsers = user => ({ type: CREATE_USERS, user });
const updateUser = user => ({ type: UPDATE_USER, user });
const deleteUser = user => ({ type: DELETE_USER, user });

//products
const getProducts = products => ({ type: GET_PRODUCTS, products });

//cart
const getCart = items => ({ type: GET_CART, items });
const addCartItem = item => {
  return { type: ADD_CART, item };
};
const deleteCartItem = item => ({ type: DELETE_CART, item });

//orders
const getOrders = orders => ({ type: GET_ORDERS, orders });
const createOrder = order => ({ type: CREATE_ORDER, order });
const updateOrder = order => ({ type: UPDATE_ORDER, order });
const deleteOrder = order => ({ type: DELETE_ORDER, order });

export {
  getCart,
  addCartItem,
  deleteCartItem,
  setAuth,
  logOutAuth,
  keepSession,
  getUsers,
  createUsers,
  updateUser,
  deleteUser,
  getProducts,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  SET_AUTH,
  GET_USERS,
  GET_PRODUCTS,
  GET_CART,
  ADD_CART,
  DELETE_CART,
  CREATE_USERS,
  UPDATE_USER,
  DELETE_USER,
  GET_ORDERS,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
};
