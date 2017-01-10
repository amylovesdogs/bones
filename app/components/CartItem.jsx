import React from 'react';

const CartItem = ({ item }) => (
	<div className="row">
	    <div className="col">{item.name}</div>
	    <div className="col">{item.price}</div>
	    <div className="col">{item.quantity}</div>
	</div>
);

export default CartItem;