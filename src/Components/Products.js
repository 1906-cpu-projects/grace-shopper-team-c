import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCartItemThunk, createOrderThunk } from '../redux/store';

class _Products extends Component {
  create(e, product) {
    const { auth, cart, orders, createOrder, toCreate } = this.props;
    e.preventDefault();

    //console.log(this.props.cart, this.props.orders);

    // Gets cart for specific user
    if (auth.name !== 'Guest') {
      const checkOrder = orders.filter(
        order => order.userId === this.props.auth.id
      );
      if (!checkOrder.length) {
        createOrder({ userId: auth.id });
        const order = orders.filter(
          order => order.userId === auth.id
        );
        if (order.length) {
          toCreate({
            productId: product.id,
            orderId: order[0].id
          });
        }
      } else {
        toCreate({
          productId: product.id,
          orderId: orders.filter(
            order => order.userId === auth.id
          )[0].id
        });
      }
    } else {
      // Adds to guest cart
      auth.cart = [...auth.cart, product];
      //console.log(auth);
    }


  }
  render() {
    //console.log(this.props.auth);
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
  ({ products, auth, cart, orders }) => {
    return {
      products,
      auth,
      cart,
      orders
    };
  },
  dispatch => {
    return {
      toCreate: item => dispatch(addCartItemThunk(item)),
      createOrder: order => dispatch(createOrderThunk(order))
    };
  }
)(_Products);

export default Products;
