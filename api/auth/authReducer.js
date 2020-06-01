/* eslint-disable prettier/prettier */
import {
  GET_USER_SUCCESS,
  LOAD_USER_SUCCESS,
  RESET_USER
}
  from '../types';

const initialState = {
  isAuthenticated: false,
  data: null,
  msg: "",
  loadUser: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isAuthenticated: action.payload.isAuthenticated,
        msg: action.payload.msg
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isAuthenticated: action.payload.isAuthenticated,
        msg: action.payload.msg,
        loadUser: false
      };
    case RESET_USER:
      return {
        ...state,
        isAuthenticated: false,
        data: null,
        msg: ""
      };
    default:
      return state;
  }
}
