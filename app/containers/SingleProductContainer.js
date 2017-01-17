import React from 'react';
import {connect} from 'react-redux';
import {addItem} from  '../reducers/cart';
import Reviews from '../components/Reviews';

const Product = ({product, addItem}) => {
  console.log(product);

  const reviewSection = product.reviews ? 
    <div>
      <h4>{product.reviews.length || 'No'} Customer Reviews</h4>
      <Reviews reviews={product.reviews}/>     
    </div> : 
    null;

  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <div className="mgn-top-md">
            <img src={product.photoURL} className="img-responsive img-rounded"/>
          </div>
        </div>
        <div className="col-md-8">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div>
            {product.averageReview && [...Array(product.averageReview)].map((review, i) => <img src="/images/star.png" key={i} className="star"/>)}
          </div>
          <h2>${product.price / 100}</h2>
          <button type="button" className="btn btn-success" onClick={() => addItem(product)}>Add to Cart</button>
        </div>
      </div>
      <div className="row mgn-top-xl">
        {reviewSection}
      </div>
    </div>
  );
}

export default connect(
  state => ({product: state.singleProduct}),
  {addItem}
) (Product);