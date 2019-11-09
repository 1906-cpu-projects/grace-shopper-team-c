import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCartItemThunk, createOrderThunk, addGuestItem } from '../redux/store';

class _Products extends Component {
  create(e, product) {
    const { auth, cart, orders, createOrder, addToCart, addGuestItem } = this.props;
    e.preventDefault();

    //console.log(this.props.cart, this.props.orders);

    // Gets cart for specific user
    if (auth.name !== 'Guest') {
      //check if user has any orders
      const checkOrder = orders.filter(
        order => order.userId === auth.id
      );
      //console.log('checkOrder: ', checkOrder);
      // if no orders create an order
      if (!checkOrder.length) {
        createOrder({ userId: auth.id });
        const order = orders.filter(
          order => order.userId === auth.id
        );
        //console.log('order', order);

        // if there is an order add to it
        if (order.length) {
          addToCart({
            productId: product.id,
            orderId: order[0].id
          });
        }
      } else {
        addToCart({
          productId: product.id,
          orderId: orders.filter(
            order => order.userId === auth.id
          )[0].id
        });
      }
    } else {
      addGuestItem(product);
    }
  }
  render() {
    //console.log('auth:', this.props.auth);
    //console.log('order: ', this.props.orders);
    //console.log('cart: ', this.props.guestCart);
    return (
      <div>
        <div className='ordering'>
          {this.props.products.map(product => (
            <div key={product.id} className='border'>
              {product.name}
              <img src={product.imageURL}
              style={{width: '100%', height: 200 }}
              />
              <br />${product.price}
              <br />
              <button onClick={e => this.create(e, product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const Products = connect(
  ({ products, auth, cart, orders, guestCart }) => {
    return {
      products,
      auth,
      cart,
      orders,
      guestCart
    };
  },
  dispatch => {
    return {
      addToCart: item => dispatch(addCartItemThunk(item)),
      createOrder: order => dispatch(createOrderThunk(order)),
      addGuestItem: item => dispatch(addGuestItem(item))
    };
  }
)(_Products);

export default Products;
