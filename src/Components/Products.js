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
    const  compare = (a, b)=>{
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA  > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }

    this.props.products.sort(compare);
    //console.log('auth:', this.props.auth);
    //console.log('order: ', this.props.orders);
    //console.log('cart: ', this.props.guestCart);
    const productList = this.props.products.map(product => {
      return(
      <div className='card' key={product.id}>
        <div className='card-image'>
          <img src={product.imageURL}/>
          <a className="btn-floating halfway-fab waves-effect waves-light red" onClick={e => this.create(e, product)}><i className="material-icons">add</i></a>
        </div>
        <div className='card-content'>
        <span className='card-title'>{product.name}</span>
          <p><b>Price: $ {product.price}</b></p>
        </div>
      </div>
      )
    })
    return (
      <div className='container'>
        <div className='box'>
          {productList}
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
