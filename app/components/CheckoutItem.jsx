import React, {Component} from 'react';

class CheckoutItem extends Component {
	constructor (props) {
		super(props);
		this.state = {
			quantity: 1
		}
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
	}

	componentWillReceiveProps (props) {
		this.setState({ 
				quantity: props.item.quantity 
			});  
	}

	handleQuantityChange (evt) {
		const quantity = Number(evt.target.value);
		this.setState({
		  quantity
		});
	}

	render () {
		const item = this.props.item;
		const updateQuantity = this.props.updateQuantity;
		const removeItem = this.props.removeItem;
		return (
			<tr>
			  <td className="col-md-2 text-center">
				  	<div>{item.name}</div>
			  </td>
			  <td className="col-md-2 text-center">
			  	<input type="number" defaultValue={item.quantity} onChange={this.handleQuantityChange}/>
			  	<button
			  		style={{margin: "5px", marginLeft: "10px"}}
			  		className="btn btn-success btn-xs"
			  		onClick={() => updateQuantity(item.id, this.state.quantity)}>
			  		<span className="glyphicon glyphicon-ok"></span>
			  	</button>
			  	<button 
			  		style={{margin: "5px"}}
			  		className="btn btn-danger btn-xs"
			  		onClick={() => removeItem(item.id)}>
			  		<span className="glyphicon glyphicon-remove"></span>
			  	</button>
			  </td>
			  <td className="col-md-1 text-center">{`$${item.price / 100}`}</td>
			 	<td className="col-md-1 text-center">{`$${item.quantity * item.price / 100}`}</td>
			</tr>
		);
	}
}

import {connect} from 'react-redux';
import {updateQuantity, removeItem} from '../reducers/cart';

const mapDispatchToProps = (dispatch) => {
	return {
		updateQuantity: (id, quantity) => {
			if (quantity === 0) dispatch(removeItem(id));
			else dispatch(updateQuantity(id, quantity));
		},
		removeItem: (id) => {
			dispatch(removeItem(id));
		}
	}
}

export default connect (
  () => ({}),
  mapDispatchToProps
) (CheckoutItem);