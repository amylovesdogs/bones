import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart }) => (
	<div>

		<div className="row">
			<div className="col-xs-4">Item(s)</div>
			<div className="col-xs-2">Price</div>
			<div className="col-xs-2">Quantity</div>
		</div>

		<ul>
			{
				Object.keys(cart.items).map(item => (
					<CartItem item={item} />
				))
			}
		</ul>

	</div>
)

import {connect} from 'react-redux'

export default connect (
  ({ cart }) => ({ cart }),
  {},
) (Cart)