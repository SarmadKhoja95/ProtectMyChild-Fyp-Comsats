/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import loadingReducer from "./loading/loadingReducer";
import reportReducer from "./report/reportReducer";

export default combineReducers({
  auth: authReducer,
  isLoading: loadingReducer,
  report: reportReducer
});
