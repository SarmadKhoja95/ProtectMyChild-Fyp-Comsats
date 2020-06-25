/* eslint-disable prettier/prettier */
import {
  GET_USER_REPORTS_SUCCESS,
  ADD_USER_REPORTS_SUCCESS
}
  from '../types';

const initialState = {
  data: {},
  msg: "",
  isAdd: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_REPORTS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        msg: action.payload.msg
      };
    case ADD_USER_REPORTS_SUCCESS:
      return {
        ...state,
        isAdd: action.payload
      };
    default:
      return state;
  }
}