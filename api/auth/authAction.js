import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config/config.json';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  RESET_USER,
}
  from '../types';

export const userLogin = (email, password) => async dispatch => {
  dispatch({
    type: RESET_USER
  });

  dispatch({
    type: GET_USER_REQUEST,
  });

  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
    },
  };
  //Request Body
  const body = JSON.stringify({ email, password });
  try {
    let res = await axios.post(config.apiUrl + "auth/userLogin", body, options);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: { isAuthenticated: true, msg: "success", data: res.data },
    });
  }
  catch (e) {
    dispatch({
      type: GET_USER_SUCCESS,
      payload: { msg: e.response.data.msg, data: null },
    });
  }
};

export const userSignup = (name, email, password) => async dispatch => {
  dispatch({
    type: RESET_USER
  });

  dispatch({
    type: GET_USER_REQUEST,
  });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
    },
  };
  try {
    //Request Body
    const body = JSON.stringify({ name, email, password });
    const url = config.apiUrl + "users";
    let res = await axios.post(url, body, options);
    const store = storeUser({ email, password });
    console.log(JSON.stringify({ email, password }));
    console.log(res);
    if (store === false) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: { isAuthenticated: false, data: null, msg: "phone storing error" }
      });
    }
    else {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: { isAuthenticated: true, msg: "signup-success", data: res.data },
      });
    }
  }
  catch (err) {
    console.log(err);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: { isAuthenticated: false, data: null, msg: err.response.data.msg }
    });
  }
};

export const loadUser = () => async dispatch => {
  dispatch({
    type: LOAD_USER_REQUEST
  });
  let data = await AsyncStorage.getItem('user');
  data = JSON.parse(data);
  console.log(data);
  if (data !== null) {
    // Request Headers
    const options = {
      headers: {
        'Content-type': config.ContentType,
      },
    };
    try {
      const body = JSON.stringify({ email: data.email, password: data.password })
      let res = await axios.post(config.apiUrl + "auth/userLogin", body, options);
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: { isAuthenticated: true, data: res.data, msg: "" }
      });
    }
    catch (e) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: { isAuthenticated: false, data: null, msg: "" }
      });
    }
  }
  else {
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: { isAuthenticated: false, data: null, msg: "" }
    });
  }
};

export const resetUser = () => async dispatch => {
  console.warn("reset");
  dispatch({
    type: RESET_USER
  });
};

const storeUser = async (data) => {
  try {
    return await AsyncStorage.setItem('user', JSON.stringify(data));
  }
  catch (err) {
    console.warn(err.message);
    return false;
  }
};