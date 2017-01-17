import React from 'react';

const Review = ({review}) => {
  return (
    <div className="mgn-top-md">
      {[...Array(review.rating)].map((r, i) => <img src="/images/star.png" key={i} className="star"/>)}
      <p>By {review.Reviewer.name}</p>
      <p className="review-content">{review.content}</p>
    </div>
  );
}

export default ({reviews}) => {
  return (
    <div>
      {reviews.map(review => <Review key={review.id} review={review}/>)}
    </div>
  );
}