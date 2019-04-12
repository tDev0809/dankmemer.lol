import { combineReducers } from 'redux';
import login from './login';
import discount from './discount';

const combinedReducer = combineReducers({
  login,
  discount
});

export default combinedReducer;
