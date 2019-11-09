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
              <div key={product.id} className='border'>
                {product.name}
                <br />${product.price}
                <br />
                <button>Add to Cart</button>
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
