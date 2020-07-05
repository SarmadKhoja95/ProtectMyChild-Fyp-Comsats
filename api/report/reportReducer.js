/* eslint-disable prettier/prettier */
import {
  GET_USER_REPORTS_SUCCESS,
  ADD_USER_REPORTS_SUCCESS,
  GET_NEARBY_REPORTS_SUCCESS,
  GET_ZONE_REPORTS_SUCCESS
}
  from '../types';

const initialState = {
  data: {},
  msg: "",
  isAdd: false,
  isNearby: false,
  isZone: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_REPORTS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        msg: action.payload.msg,
      };
    case ADD_USER_REPORTS_SUCCESS:
      return {
        ...state,
        isAdd: action.payload
      };
      case GET_NEARBY_REPORTS_SUCCESS:
      return {
        ...state,
        isNearby: action.payload
      };
      case GET_ZONE_REPORTS_SUCCESS:
      return {
        ...state,
        isZone: action.payload
      };
    default:
      return state;
  }
}