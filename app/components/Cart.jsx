import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart }) => (
	<div className="container-fluid">

	<table className="table cart-main-table">

	  <thead>
	    <tr>
	      <th className="col-md-4">Item(s)</th>
	      <th className="col-md-2">Quantity</th>
	      <th className="col-md-2">Unit Price</th>
	      <th className="col-md-2">Subtotal</th>
	    </tr>
	  </thead>

	  <tbody>
			{
				Object.keys(cart.items).map(key => {
					let item = cart.items[key];
					return <CartItem item={item} key={item.id}/>
				})
			}
	  </tbody>

	</table>

	<table className="table cart-side-table">

		<tbody>
			<tr>
				<th className="col-md-4">Sub-total</th>
				<td className="col-md-2">{cart.subTotal}</td>
			</tr>
			<tr>
				<th className="col-md-4">Shipping & Handling</th>
				<td className="col-md-2"></td>
			</tr>
			<tr>
				<th className="col-md-4">Total</th>
				<td className="col-md-2"></td>
			</tr>
			
		</tbody>

	</table>

	</div>
);

import {connect} from 'react-redux';

export default connect (
  ({ cart }) => ({ cart }),
  {},
) (Cart);