import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCartItemThunk, deleteGuestItem } from '../redux/store';

class _Cart extends Component {
  render() {
    const { cart, guestCart, destroy, deleteGuestItem, orders, auth, products } = this.props;
    let userCart, ownCart, cartTotal;
    if(auth.name !== 'Guest'){
      const orderAuth = orders.filter(order => order.userId === auth.id);
      userCart =
      orderAuth.length !== 0
        ? cart.filter(item => item.orderId === orderAuth[0].id)
        : [];
      ownCart = userCart.map(item => ({
        ...item,
        product: products.find(product => product.id === item.productId)
      }));
      cartTotal = ownCart
        .map(item => item.product.price * 1)
        .reduce((acc, curr) => acc + curr, 0)
        .toFixed(2);
    } else {
      userCart = [...guestCart];
      cartTotal = userCart.map( item => item.price * 1 ).reduce((acc, curr) => acc + curr, 0).toFixed(2);
    }

    if (userCart.length === 0) {
      return (
        <div>
          <h2>Your Cart</h2>
          <div>Your cart is empty</div>
        </div>
      );
    }
    return (
      <div>
        <h2>Your Cart</h2>
        <ul>
          {
            auth.name !== 'Guest' ?
            ownCart.map(item => (
              <li key={item.id}>
                {item.product.name} ${item.product.price}
                <button onClick={() => destroy(item)}>Remove Item</button>
              </li>
            )) : userCart.map(item =>
                <li key={item.id}>
                  { item.name } ${item.price}
                  <button onClick={() => deleteGuestItem(item)}>Remove Item</button>
                </li>)
          }
        </ul>
        <h3>Subtotal ${cartTotal}</h3>
        <button>Submit Order</button>
      </div>
    );
  }
}

const Cart = connect(({ cart, guestCart, products, orders, auth }) => {
  return {
    cart,
    guestCart,
    products,
    orders,
    auth
  };
}, (dispatch) => {
  return {
    destroy: item => dispatch(deleteCartItemThunk(item)),
    deleteGuestItem: item => dispatch(deleteGuestItem(item))
  }
})(_Cart);
export default Cart;
