import { combineReducers } from 'redux';
import login from './login';

const combinedReducer = combineReducers({
  login
});

export default combinedReducer;
