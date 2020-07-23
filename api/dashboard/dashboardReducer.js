/* eslint-disable prettier/prettier */
import {
    GET_CHILDREN_SUCCESS,
    ADD_CHILD_SUCCESS,
    RESET_ADD_CHILD
  }
    from '../types';
  
  const initialState = {
    data: [],
    msg: "",
    isAdd: false
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_CHILDREN_SUCCESS:
        return {
          ...state,
          data: action.payload.data,
          msg: action.payload.msg
        };
  
      case ADD_CHILD_SUCCESS:
        return {
          ...state,
          isAdd: action.payload
        }
      case RESET_ADD_CHILD:
        return {
          ...state,
          isAdd: false
        }
      default:
        return state;
    }
  }