/* eslint-disable prettier/prettier */
import {
    ADD_HELP_REPORTS_SUCCESS,
    GET_HELP_REPORTS_SUCCESS,
    UPDATE_HELP_REPORT_SUCCESS,
    UPDATE_FOUND_CHILD_SUCCESS
  }
    from '../types';
  
  const initialState = {
    data: {},
    msg: "",
    isAdd: false,
    isFound: false
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case ADD_HELP_REPORTS_SUCCESS:
        return {
          ...state,
          data: action.payload.data,
          msg: action.payload.msg,
          isAdd: true
        };
        case GET_HELP_REPORTS_SUCCESS:
          return {
            ...state,
            data: action.payload.data,
            msg: action.payload.msg,
          };
          case UPDATE_HELP_REPORT_SUCCESS:
          return {
            ...state,
            data: action.payload.data,
            msg: action.payload.msg,
          };
          case UPDATE_FOUND_CHILD_SUCCESS:
          return {
            ...state,
            data: action.payload.data,
            msg: action.payload.msg,
            isFound: action.payload
          };
      default:
        return state;
    }
  }