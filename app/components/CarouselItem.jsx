import React from 'react';
import {Link} from 'react-router';

const CarouselItem = ({ product }) => {
	return (
		<div className="col-md-4">
		    <div className="col-item">
		        <div className="photo">
			        <Link to={`/products/${product.id}`}>
			          <img src={ product.photoURL } className="img-responsive"/>
			        </Link>
		        </div>
		        <div className="info">
		            <div className="row">
		                <div className="price col-md-6">
		                		<Link to={`/products/${product.id}`}>
		                			<div className="name">{product.name}</div>
		                		</Link>
		                    <h5 className="price-text-color">{`$${product.price / 100}`}</h5>
		                </div>
		                <div className="rating hidden-sm col-md-6">
            					{product.averageReview && [...Array(product.averageReview)].map((review, i) => <img src="/images/star.png" key={i} className="star"/>)}
		                </div>
		            </div>
		            <div className="clearfix">
		            </div>
		        </div>
		    </div>
		</div>
		);
};

export default CarouselItem;