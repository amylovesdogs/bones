import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart }) => (
	<div className="container-fluid">

	<table className="table">

	  <thead>
	    <tr>
	      <th className="col-md-2">Item(s)</th>
	      <th className="col-md-2">Quantity</th>
	      <th className="col-md-2">Unit Price</th>
	      <th className="col-md-2">Subtotal</th>
	    </tr>
	  </thead>

	  <tbody>
			{
				Object.keys(cart.items).map(key => (
					<CartItem item={cart.items[key]} />
				))
			}
	  </tbody>

	</table>

	</div>
)

import {connect} from 'react-redux'

export default connect (
  ({ cart }) => ({ cart }),
  {},
) (Cart)