import * as actions from '../constants';

export default function(state = [], action) {
  switch (action.type) {
    case actions.RECEIVE_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
}