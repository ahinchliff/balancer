import { SET_TRANSACTION_LIST } from '../actions/types';


export default function(state = null, action) {
  switch (action.type) {
    case SET_TRANSACTION_LIST:
      return action.payload;
    default:
      return state;
  }
}