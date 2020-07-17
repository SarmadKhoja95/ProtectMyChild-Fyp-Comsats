import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config/config.json';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { v4 as uuidv4 } from "react-native-uuid";
import Firebase from "../../firebase";

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  RESET_UPDATE_USER,
  RESET_USER,
}
  from '../types';

  const getToken = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        getToken();
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      return token;
    }
  };

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
    let result = res.data;
    setProfilePicture(result.user, result.user._id);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: { isAuthenticated: true, msg: "success", data: result },
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
    let pushToken = await getToken();
    //Request Body
    const body = JSON.stringify({ name, email, password, pushToken});
    const url = config.apiUrl + "users";
    let res = await axios.post(url, body, options);
    const store = storeUser({ email, password });
    console.log(JSON.stringify({ email, password }));
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

export const updateUser = (token, isNew, name, phone, city, avatar, userData) => async dispatch => {

  dispatch({
    type: UPDATE_USER_REQUEST,
  });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
      "x-auth-token": token
    },
  };

  try {
    if (isNew) {
      const response = await fetch(avatar);
      const blob = await response.blob();
      let imgName = uuidv4() + ".jpg";
      console.log(imgName);
      var ref = Firebase.storage().ref().child("profile/" + userData.user._id + "/" + imgName);
      await ref.put(blob);
      const body = JSON.stringify({ name, phone, profilePicture: imgName, city, isNew });
      console.warn(body);
      const url = config.apiUrl + 'users/updateUser';
      console.log("I am here");
      let result = await axios.put(url, body, options);
      let newUser = result.data.data;
      setProfilePicture(newUser, userData.user._id );
      console.log("new userrr")
      console.log(newUser)
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { data: newUser, msg: "success", isUpdate: true }
      });
    }
    else {
      const body = JSON.stringify({ name, phone, profilePicture: avatar, city, isNew });
      const url = config.apiUrl + 'users/updateUser';
      let result = await axios.put(url, body, options);
      //save old profile 
      userData.user = result.data.data;
      setProfilePicture(userData.user, userData.user._id );
      // let profilePicture = userData.user.profilePicture;
      // userData.user.profilePictue = profilePicture;
      console.log(userData);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { data: userData, msg: "success", isUpdate: true }
      });
    }
  }
  catch (e) {
    console.log("jere");
    console.log(e.message);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: { isUpdate: false, data: userData, msg: e.message }
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

export const resetUpdateUser = () => dispatch => {
  dispatch({
    type: RESET_UPDATE_USER
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

export async function setProfilePicture(user,id){
 
  let ref = Firebase.storage().ref().child("profile/" + id + "/" + user.profilePicture);
  let url = await ref.getDownloadURL();
  user.profilePicture = url;
 
}