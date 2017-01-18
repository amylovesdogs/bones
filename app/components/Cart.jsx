import React from 'react';
import CartItem from './CartItem';
import {browserHistory} from 'react-router';

const Cart = ({ cart }) => {

	const emptyCart = (
		<tr>
			<td className="text-center" colSpan="4">
				<h3>Your cart is currently empty</h3>
				<img src="http://simpleicon.com/wp-content/uploads/shopping-cart-8.svg" className="cart-empty-photo"/>
			</td>
		</tr>
	);

	const truncate = (number, digits) => {
		return number.toFixed(digits);
	};

	const subTotal = truncate(cart.subTotal, 2);
	const tax = truncate(cart.subTotal * 0.07, 2);
	const total = truncate(cart.subTotal * 1.07, 2);

	const notEmpty = Object.keys(cart.items).length !== 0;

	return (

		<div className="container-fluid">

			<table className="table table-bordered table-responsive">

			  <thead>
			    <tr>
			      <th className="col-md-2 text-center">Item(s)</th>
			      <th className="col-md-2 text-center">Quantity</th>
			      <th className="col-md-1 text-center">Unit Price</th>
			      <th className="col-md-1 text-center">Sub-total</th>
			    </tr>
			  </thead>

			  <tbody>
					{
						notEmpty && 
						Object.keys(cart.items).map(key => {
							let item = cart.items[key];
							return <CartItem item={item} key={item.id}/>
						})
						||
						emptyCart
					}
			  </tbody>

			</table>

			<div className="cart-side-table col-md-4">

				<table className="table table-bordered">

					<tbody>
						<tr>
							<th className="col-md-2 text-center">Sub-total</th>
							<td className="col-md-2 text-center">{subTotal}</td>
						</tr>
						<tr>
							<th className="col-md-2 text-center">Tax</th>
							<td className="col-md-2 text-center">{tax}</td>
						</tr>
						<tr>
							<th className="col-md-2 text-center">Total</th>
							<td className="col-md-2 text-center">{total}</td>
						</tr>
						
					</tbody>

				</table>

				<button className="btn btn-success" 
					style={{width: "100%"}} 
					disabled={!notEmpty} 
					onClick={() => {
						browserHistory.push("/checkout")}
					}>
					Checkout
				</button>

			</div>

		</div>

	);

}

import {connect} from 'react-redux';

export default connect (
  ({ cart }) => ({ cart }),
  {},
) (Cart);