const initialState = {
	items: {
		0: {
			id: 0,
			name: 'BLAHBLAH',
			description: 'Da blahiest of blahs Da blahiest of blahs Da blahiest of blahs Da blahiest of blahs Da blahiest of blahs Da blahiest of blahs Da blahiest of blahs Da blahiest of blahs',
			quantity: 1,
			price: 34999,
			photoURL: 'http://i2.kym-cdn.com/entries/icons/facebook/000/013/564/aP2dv.jpg'
		}
	},
	subTotal: 349.99
};

import axios from 'axios';
import {browserHistory} from 'react-router';

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch(action.type) {

		case ADD_ITEM:
			let id = action.item.id;
			if (newState.items[id]) newState.items[id] = {
				...newState.items[id],
				quantity: newState.items[id].quantity + 1
			}
			else newState.items[id] = {
				...action.item,
				quantity: 1
			};
			newState.subTotal += newState.items[id].price / 100;
			break;

		case REMOVE_ITEM:
			let item = newState.items[action.id];
			newState.subTotal -= item.price * item.quantity / 100;
			delete newState.items[action.id];
			break;

		case UPDATE_QUANTITY:
			let difference =  action.quantity - newState.items[action.id].quantity;
			newState.items[action.id] = {
				...newState.items[action.id],
				quantity: action.quantity
			}
			newState.subTotal += newState.items[action.id].price * difference / 100;
			break;

	};
	return newState;
};

const ADD_ITEM = 'ADD_ITEM';
export const addItem = item => ({
	type: ADD_ITEM,
	item
});

const REMOVE_ITEM = 'REMOVE_ITEM';
export const removeItem = id => ({
	type: REMOVE_ITEM,
	id
});

const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const updateQuantity = (id, quantity) => ({
	type: UPDATE_QUANTITY,
	id,
	quantity
});

const PLACE_ORDER = 'PLACE_ORDER';
export const placeOrder = (order) => {
  return dispatch => {
    axios.post('/api/orders', order)
    .then(res => {
    	browserHistory.push('/checkout/success');
    })
  };
};

export default reducer;