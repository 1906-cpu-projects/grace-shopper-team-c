import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCartItemThunk } from '../redux/store';

class Cart extends Component {
  render() {
    const { cart, destroy, orders, auth, products } = this.props;
    const orderAuth = orders.filter(order => order.userId === auth.id);
    const userCart =
      orderAuth.length !== 0
        ? cart.filter(item => item.orderId === orderAuth[0].id)
        : [];
    const ownCart = userCart.map(item => ({
      ...item,
      product: products.find(product => product.id === item.productId)
    }));
    const cartTotal = ownCart
      .map(item => item.product.price * 1)
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);

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
          {ownCart.map(item => (
            <li key={item.id}>
              {item.product.name} ${item.product.price}
              <button onClick={() => destroy(item)}>Remove Item</button>
            </li>
          ))}
        </ul>
        <h3>Subtotal ${cartTotal}</h3>
        <button>Submit Order</button>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, products, orders, auth }) => {
  //cartTotal maps the prices of each item in a cart and totals those prices. Note: doesn't account for tax
  // const cartTotal = cart
  //   .map(item => item.price * 1)
  //   .reduce((acc, curr) => acc + curr, 0)
  //   .toFixed(2);
  return {
    cart,
    products,
    auth,
    orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    destroy: item => {
      return dispatch(deleteCartItemThunk(item));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
