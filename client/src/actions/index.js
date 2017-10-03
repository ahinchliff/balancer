import axios from 'axios';
import { SET_USER } from './types';
import { SET_FRIEND_LIST } from './types';
import { UPDATE_FRIEND_LIST } from './types';
import { SET_SELECTED_FRIEND } from './types';
import { SET_TRANSACTION_LIST } from './types';
import { UPDATE_FRIEND_BALANCE } from './types';
import { DELETE_FRIEND } from './types';
import { EDIT_FRIEND } from './types';

export const fetchUser = () => async dispatch => {
  const res =  await axios.get('/auth/current_user');
  dispatch({ type: SET_USER, payload: res.data });
};

export const updateUser = user => {
  return { type: SET_USER, payload: user };
};

export const fetchFriendList = () => async dispatch => {
  const res = await axios.get('/api/friends/');
  dispatch({ type: SET_FRIEND_LIST, payload: res.data });
};

export const addNewFriend = newFriend => dispatch => {
  dispatch({ type: UPDATE_FRIEND_LIST, payload: newFriend });
  dispatch(updateSelectedFriend(newFriend._id, newFriend.name));
};

export const updateSelectedFriend = (friendId, friendName) => async dispatch => {
  dispatch({ type: SET_SELECTED_FRIEND, payload: { friendId, friendName }});
  dispatch({ type: SET_TRANSACTION_LIST, payload: null });
  const res = await axios.get(`/api/friends/${friendId}/transactions`);
  dispatch({ type: SET_TRANSACTION_LIST, payload: res.data });
};

export const addNewTransaction = (friendId, newBalance, newTransactions) => dispatch => {
  dispatch({ type: SET_TRANSACTION_LIST, payload: newTransactions });
  dispatch({ type: UPDATE_FRIEND_BALANCE, payload: { friendId, newBalance } });
};

export const deleteFriend = friendId => dispatch => {
  dispatch({ type: DELETE_FRIEND, payload: friendId });
  dispatch({ type: SET_TRANSACTION_LIST, payload: null });
  dispatch({ type: SET_SELECTED_FRIEND, payload: null });
}

export const editFriend = (newFriend) => dispatch => {
  dispatch(updateSelectedFriend(newFriend._id, newFriend.name));  
  dispatch({ type: EDIT_FRIEND, payload: newFriend });
}

