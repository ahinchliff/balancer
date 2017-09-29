import { combineReducers } from 'redux';
import { reducer as reduxForm} from 'redux-form'
import user from './reducer_user';
import friendList from './reducer_friendList';
import selectedFriend from './reducer_selectedFriend';
import transactionList from './reducer_transactionList';

export default combineReducers({
  user,
  friendList,
  selectedFriend,
  transactionList,
  form: reduxForm,
});