import { RECEIVE_PRODUCTS } from '../constants';

const initialProductState = {
  selected: {},
  list: []
};

export default function (state = initialProductState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_PRODUCTS:
      return {
        list: action.products
      }

    default:
      return state;

  }

}