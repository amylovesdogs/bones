import React from 'react';
import {Link} from 'react-router';
import store from '../store';
import {addItem} from '../reducers/cart.js';

export default function (props) {
  const products = props.products;

  function addToCart(product) {
    console.log("product is ",product);
    store.dispatch(addItem(product));
  }

  return (
    <div>
      <h3>Products</h3>
      <div className="row">
        {
          products && products.map(product => (
            <div className="col-xs-4" key={ product.id }>
              <h5>{ product.name }</h5>
              <Link className="thumbnail" to={`/products/${product.id}`}>
                <img src={ product.photoURL }/>
              </Link>
              <div className="caption">
                <div className="description">{ product.description}</div>
              </div>
              <h2>${product.price / 100}</h2>
              <div className="caption">
                <button type="button" className="btn btn-success" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};