import React from 'react';

const CartItem = ({ item }) => (
	<tr>
	  <td className="col-md-2">
	  	<div>{item.name}</div>
	  	<div>
	  		<img src={item.photoUrl} className="cart-item-photo"/>
	  	</div>
	  </td>
	  <td className="col-md-2">
	  	<input type="numeric" defaultValue={item.quantity}/>
	  	<button className='btn btn-success'>Update</button>
	  	<button className='btn btn-danger'>Remove</button>
	  </td>
	  <td className="col-md-2">{`$${item.price}`}</td>
	 	<td className="col-md-2">{`$${item.quantity * item.price}`}</td>
	</tr>
);

export default CartItem;