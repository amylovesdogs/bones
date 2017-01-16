import React from 'react';
import {connect} from 'react-redux';

const Product = ({product}) => {
  return (
    <div className="row">
      <div className="col-md-2">
        <div className="mgn-top-md">
          <img src={product.photoURL} className="img-responsive img-rounded"/>
        </div>
      </div>
      <div className="col-md-8">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h2>${product.price / 100}</h2>
        <button type="button" className="btn btn-success">Add to Cart</button>
      </div>
    </div>
  );
}

export default connect(state => ({product: state.singleProduct}))(Product);