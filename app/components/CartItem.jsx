import React, {Component} from 'react';
import {Link} from 'react-router';

class CartItem extends Component {
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
			  <td className="col-md-2">
    			<div className="text-center">
  	  			<img src={item.photoURL} className="cart-item-photo" style={{margin: "5px"}}></img>
  	  			<Link to={`/products/${item.id}`} style={{margin: "5px"}}>{item.name}</Link>
    			</div>
			  </td>
			  <td className="col-md-2 text-center">
			  	<input 
			  		type="numeric" defaultValue={item.quantity} onChange={this.handleQuantityChange}/>
			  	<div>
				  	<button
				  		style={{margin: "10px"}}
				  		className='btn btn-success'
				  		onClick={() => updateQuantity(item.id, this.state.quantity)}>
				  		Update
				  	</button>
				  	<button 
				  		style={{margin: "10px"}}
				  		className='btn btn-danger cart-item-remove-btn'
				  		onClick={() => removeItem(item.id)}>
				  		Remove
				  	</button>
			  	</div>
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
) (CartItem);