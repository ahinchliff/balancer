import { SET_SELECTED_FRIEND } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case SET_SELECTED_FRIEND:
      return action.payload;
    default:
      return state;
  }
}