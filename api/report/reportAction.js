import axios from 'axios';
import config from '../../config/config.json';
import {
  GET_USER_REPORTS_REQUEST,
  GET_USER_REPORTS_SUCCESS,
  ADD_USER_REPORTS_REQUEST,
  ADD_USER_REPORTS_SUCCESS,
}
  from '../types';

import { v4 as uuidv4 } from "react-native-uuid";
import Firebase from "../../firebase";

export const addReport = (name, age, profilePicture, city, location, radius, wearing, gender, info, token, reportData) => async dispatch => {

  dispatch({ type: ADD_USER_REPORTS_REQUEST });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
  };
  try {
    const response = await fetch(profilePicture);
    const blob = await response.blob();
    let imgName = uuidv4() + ".jpg";
    console.log("Image name:", imgName);
    var ref = Firebase.storage().ref().child("report/" + imgName);
    await ref.put(blob);
    const body = JSON.stringify({ name, age, profilePicture: imgName, city, location, radius, wearing, gender, info });
    const url = config.apiUrl + 'reports/';
    let res = await axios.post(url, body, options);
    
    dispatch({
      type: ADD_USER_REPORTS_SUCCESS,
      payload: true,
    });
    dispatch(getReports(token));
  }
  catch (e) {
    dispatch({
      type: ADD_USER_REPORTS_SUCCESS,
      payload: false,
    });
  }
}

export const getReports = (token) => async dispatch => {

  dispatch({ type: GET_USER_REPORTS_REQUEST });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
  };
  try {
    let res =await axios.get(config.apiUrl + "reports/", options);
    setProfilePicture(res);
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

export async function setProfilePicture(res){
        let result = res.data.data.result
         for (let i = 0; i < result.length; i++) {
         let ref = Firebase.storage().ref().child("report/" + result[i].profilePicture);
         let url = await ref.getDownloadURL();
         result[i].profilePicture = url;
        }
}