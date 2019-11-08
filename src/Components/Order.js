import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

const _Order = ({ users, auth, match, products, orders })=> {
  //page loading
  if (users.length === 0 || !auth.id || products.length === 0 || orders.length === 0) {
    return (
      <div>
        <h1>Order</h1>
        <h3>Loading...</h3>
        <Link to='/'>return home</Link>
      </div>
    );
  }
  //find current user and current order
  const user = users.find( user => user.id === auth.id);
  const orderId = match.params.id;
  const currentOrder = user.orders.find( order => order.id === orderId);

  return (
    <div className='orderContainer'>
      <h1>Order for {user.name}</h1>
      <h2>Order #{orderId}</h2>
      {
        !currentOrder.complete ?
        <div>
          <h3>Status: In Progress</h3>
          <div>Go back to <Link to='/cart'>cart</Link></div>
        </div> :
        <h3>Status: Complete</h3>
      }
      <ul>
        {
          currentOrder.lineItems.map((lineItem, idx) =>
            <li key={idx}>
              <div><b>Item: {products.find(product => product.id === lineItem.productId).name}</b></div>
              <img src={products.find(product => product.id === lineItem.productId).imageURL}
              style={{width: 200, height: 200 }}
              />
              <div>Price: ${products.find(product => product.id === lineItem.productId).price}</div>
              <div>Quantity: {lineItem.quantity}</div>
              <div>Subtotal: ${products.find(product => product.id === lineItem.productId).price * lineItem.quantity}</div>
              <br/>
            </li>
          )
        }
      </ul>
      <h3>Order Total ${ currentOrder.lineItems.map(lineItem =>
          products.find(product => product.id === lineItem.productId).price * lineItem.quantity)
            .reduce((acc, curr)=> acc + curr, 0)
            .toFixed(2)}
      </h3>
      <Link to='/profile'>return to profile</Link>
    </div>
  );
}

const mapStateToProps = ({ users, auth, products, orders })=> {
  return {
    users,
    auth,
    products,
    orders
  };
}

const Order = connect(mapStateToProps)(_Order);

export default Order;
