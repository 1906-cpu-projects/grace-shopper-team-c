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
      <div className='container'>
        <div className='cart'>
          <h2>Your Cart</h2>
          <ul className='collection'>
            {
              auth.name !== 'Guest' ?
              ownCart.map(item => (
              <li className ='collection-item avatar' key={item.id}>
                <div className='item-img'>
                  <img src={item.product.imageURL}/>
                </div>
                <div className='item-desc'>
                  <span className="title">{item.product.name}</span>
                  <p><b>Price: {item.product.price}$</b></p>
                  <p>
                      <b>Quantity:</b>
                  </p>
                </div>
                  <div className='add-remove'>
                  <i className="material-icons">arrow_drop_up</i>
                  <i className="material-icons">arrow_drop_down</i>
                  </div>
                <button className='waves-effect waves-light btn orange darken-3 remove'onClick={() => deleteGuestItem(item)}>Remove Item</button>
              </li>
            )) : userCart.map(item => (
              <li className ='collection-item avatar' key={item.id}>
                <div className='item-img'>
                  <img src={item.imageURL}/>
                </div>
                <div className='item-desc'>
                  <span className="title">{item.name}</span>
                  <p><b>Price: {item.price}$</b></p>
                  <p>
                      <b>Quantity:</b>
                  </p>
                </div>
                  <div className='add-remove'>
                  <i className="material-icons">arrow_drop_up</i>
                  <i className="material-icons">arrow_drop_down</i>
                  </div>
                <button className='waves-effect waves-light btn orange darken-3 remove'onClick={() => destroy(item)}>Remove Item</button>
              </li>))
          }
          </ul>
          <h3>Subtotal ${cartTotal}</h3>
          <button>Submit Order</button>
        </div>
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
