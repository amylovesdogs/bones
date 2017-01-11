const newState = {
	items: {
		1: {
			name: 'BLAHBLAH',
			quantity: 1,
			price: 349.99,
			photoUrl: 'http://i2.kym-cdn.com/entries/icons/facebook/000/013/564/aP2dv.jpg'
		}
	}
};

const reducer = (state=newState, action) => {
	let updatedState = Object.assign({}, state);
	switch(action.type) {

		case ADDED_ITEM:
			let id = action.item.id;
			if (updatedState.items[id]) updatedState.items[id].quantity += 1;
			else updatedState.items[id] = action.item;
			break;

	};
	return updatedState;
};

const ADDED_ITEM = 'ADDED_ITEM';
export const added_item = item => ({
	type: ADDED_ITEM,
	item
});

export default reducer;