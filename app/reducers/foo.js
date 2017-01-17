import axios from 'axios';
import { RECEIVE_CATEGORIES, SELECT_CATEGORY} from '../constants';

const initialState = {
    list: [],
    selected: -1   // none selected. display all.
};

const reducer = (state=initialState, action) => {
	switch(action.type) {
		case RECEIVE_CATEGORIES:
      return Object.assign({},state, {list: action.list});

    case SELECT_CATEGORY:
      return Object.assign({},state, {selected: action.selected});
  }
	return state;
};


export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    list: categories
});

export const selectCategory = category => ({
    type: SELECT_CATEGORY,
    selected: category
});

export const getCategories = () => {
  return dispatch => {
    axios.get('/api/categories')
    	.then(res => res.data)
      .then(categories => {
        categories = categories.sort((catA, catB) => {
          if (catA.name < catB.name) return -1;
          if (catA.name > catB.name) return 1;
          return 0;
        });
        dispatch(receiveCategories(categories));
      });
  };
};

export const setSelected = (category) => {
  dispatch(selectCategory(categories));
};

export default reducer;