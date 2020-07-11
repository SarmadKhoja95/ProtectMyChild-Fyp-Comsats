/* eslint-disable prettier/prettier */
import {
  GET_USER_SUCCESS,
  LOAD_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  RESET_UPDATE_USER,
  RESET_USER
}
  from '../types';

const initialState = {
  isAuthenticated: false,
  data: null,
  msg: "",
  isUpdate: false,
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
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          data: action.payload.data,
          msg: action.payload.msg,
          isUpdate: action.payload.isUpdate
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
      case RESET_UPDATE_USER:
      return {
        ...state,
        isUpdate: false
      };
    default:
      return state;
  }
}
