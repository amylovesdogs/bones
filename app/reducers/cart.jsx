const newState = {
	items: {
		1: {
			name: 'Test'
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