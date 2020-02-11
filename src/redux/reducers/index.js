import { combineReducers } from 'redux';
import cashflow from './cashflow';
import customers from './customers';

export default combineReducers({ cashflow, customers });
