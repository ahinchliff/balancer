import { SET_FRIEND_LIST } from '../actions/types';
import { UPDATE_FRIEND_LIST } from '../actions/types';
import { UPDATE_FRIEND_BALANCE } from '../actions/types';
import { DELETE_FRIEND } from '../actions/types';
import { EDIT_FRIEND } from '../actions/types';


export default function(state = null, action) {
  switch (action.type) {
    case SET_FRIEND_LIST:
      return action.payload;
    case UPDATE_FRIEND_LIST:
      return [...state, action.payload];
    case UPDATE_FRIEND_BALANCE:
      const { friendId, newBalance } = action.payload;
      return state.map((friend) => {
        if (friend._id === friendId) {
          friend.balance = newBalance;
        }
        return friend;
      })
    case DELETE_FRIEND:
      return state.filter((friend) => {
        return (friend._id !== action.payload);
      })
    case EDIT_FRIEND:
      
      return state.map(friend => {
        if (friend._id === action.payload._id) {
          friend.name = action.payload.name;
        }
        return friend;
      });
    default:
      return state;
  }
}