import React from 'react';
import Products from './Products';
import { connect } from 'react-redux';

class _Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchProducts: [],
      input: ''
    };
  }
  startSearch(e) {
    const searchProducts = this.props.products.filter(item =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({ searchProducts, input: e.target.value });
  }
  render() {
    const { searchProducts, input } = this.state;
    return (
      <div className='container'>
        <input
          type='text'
          className='search'
          name='input'
          onKeyUp={e => this.startSearch(e)}
          placeholder='Search products'
        />
        <div className='ordering'>
          {searchProducts.length === 0 && !input ? (
            <Products />
          ) : (
            searchProducts.map(product => (
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
            ))
          )}
        </div>
      </div>
    );
  }
}

const Search = connect(({ products }) => {
  return {
    products
  };
})(_Search);

export default Search;
