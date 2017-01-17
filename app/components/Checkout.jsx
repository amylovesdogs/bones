import React, {Component} from 'react';
import CheckoutItem from './CheckoutItem';
import CheckoutForm from './CheckoutForm';
import {Link} from 'react-router';

class Checkout extends Component{
	constructor(props) {
		super(props);
		this.state = {}
		this.getFullAddress = this.getFullAddress.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getFullAddress() {
		const keys = ['name', 'street', 'city', 'state', 'country'];
		let fullAddress = keys.map(key => {
			this.state[key];
		})
		return keys.join(' ');
	}

	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}

	handleSubmit() {
		let address = this.getFullAddress();
		let email = this.state.email;
		let items = this.props.cart.items;
		const order = {
			address,
			email,
			items
		}
		this.props.placeOrder(order);
	}

	render() {

		const cart = this.props.cart;

		const empty = (
			<div className="text-center">
				<h3>You have no items in your cart</h3>
				<Link className="btn btn-success" to="/cart">Back to cart</Link>
			</div>
		);

		const truncate = (number, digits) => {
			return number.toFixed(digits);
		};

		const subTotal = truncate(cart.subTotal, 2);
		const tax = truncate(cart.subTotal * 0.07, 2);
		const total = truncate(cart.subTotal * 1.07, 2);


		if (!Object.keys(cart.items).length) return empty;
		else return (

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
							Object.keys(cart.items).map(key => {
								let item = cart.items[key];
								return <CheckoutItem item={item} key={item.id}/>
							})
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

					<button className="btn btn-success" style={{width: "100%"}} onClick={this.handleSubmit}>Place Order</button>
				</div>

				<CheckoutForm handleChange={this.handleChange}/>

			</div>

		);
	}

};

import {connect} from 'react-redux';
import {placeOrder} from '../reducers/cart'

const mapDispatchToProps = (dispatch) => {
	return {
		placeOrder: (order) => {
			dispatch(placeOrder(order));
		}
	}
}

export default connect (
  ({ cart }) => ({ cart }),
  mapDispatchToProps
) (Checkout);