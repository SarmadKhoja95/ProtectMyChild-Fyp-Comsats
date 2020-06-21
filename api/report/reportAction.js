import axios from 'axios';
import config from '../../config/config.json';
import {
  GET_USER_REPORTS_REQUEST,
  GET_USER_REPORTS_SUCCESS,
  ADD_USER_REPORTS_REQUEST,
  ADD_USER_REPORTS_SUCCESS,
}
  from '../types';

  export const addReport = (name, age, profilePicture, city, location, wearing, token) => async dispatch => {

    dispatch({ type: ADD_USER_REPORTS_REQUEST });
    // Request Headers
    const options = {
      headers: {
        'Content-type': config.ContentType,
        'x-auth-token': token
      },
    };
    try {
      const body = JSON.stringify({ name, age, profilePicture, city, location, wearing });
      const url = config.apiUrl + 'reports/';
      let res = await axios.post(url,body,options);
      dispatch({
        type: ADD_USER_REPORTS_SUCCESS,
        payload: { msg: "success", isAdd: true, data: res.data },
      });
    }
    catch (e) {
      dispatch({
        type: ADD_USER_REPORTS_SUCCESS,
        payload: { msg: e.response.data.msg, data: null },
      });
    }
  }

export const getReports = (token) => async dispatch => {
  console.log(token);
  dispatch({ type: GET_USER_REPORTS_REQUEST });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
  };
  try {
    let res = await axios.get(config.apiUrl + "reports/", options);
    dispatch({
      type: GET_USER_REPORTS_SUCCESS,
      payload: { msg: "success", data: res.data },
    });
  }
  catch (e) {
    dispatch({
      type: GET_USER_REPORTS_SUCCESS,
      payload: { msg: e.response.data.msg, data: null },
    });
  }
}