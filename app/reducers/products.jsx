import { RECEIVE_ALBUMS, RECEIVE_ALBUM } from '../constants';

const initialProductState = {
  selected: {},
  list: []
};

export default function (state = initialArtistState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_ARTISTS:
      newState.list = action.products;
      break;

    case RECEIVE_ARTIST:
      newState.selected = action.product;
      break;

    default:
      return state;

  }

  return newState;

}