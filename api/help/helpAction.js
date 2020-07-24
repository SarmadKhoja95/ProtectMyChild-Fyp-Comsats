import axios from 'axios';
import config from '../../config/config.json';
import {
  ADD_HELP_REPORTS_REQUEST,
  ADD_HELP_REPORTS_SUCCESS,
  GET_HELP_REPORTS_REQUEST,
  GET_HELP_REPORTS_SUCCESS,
  UPDATE_HELP_REPORT_REQUEST,
  UPDATE_HELP_REPORT_SUCCESS,
  UPDATE_FOUND_CHILD_REQUEST,
  UPDATE_FOUND_CHILD_SUCCESS
}
  from '../types';
import Firebase from "../../firebase";
import { v4 as uuidv4 } from "react-native-uuid";

export const addHelp = (userData, toUserId, reportId, reportData ,token) => async dispatch => {
  
  dispatch({ type: ADD_HELP_REPORTS_REQUEST });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
  };
  try {
    const body = JSON.stringify({ fromUserId : userData._id, fromUserName : userData.name, fromUserEmail : userData.email, fromUserCity : userData.city, fromUserContact : userData.phone, fromUserPicture : userData.profilePicture, fromUserToken : userData.pushToken, toUserId, reportId, reportData});
    const url = config.apiUrl + 'help/addHelp';
    let res = await axios.post(url, body, options);
    dispatch({
      type: ADD_HELP_REPORTS_SUCCESS,
      payload: { data: res.data , isAdd: true,  msg: "success" }
    });
  }
  catch (e) {
    dispatch({
      type: ADD_HELP_REPORTS_SUCCESS,
      payload: { data: {} , isAdd: false,  msg: e.msg },
    });
  }
}

export const getHelpReports = ( id ,token) => async dispatch => {

  dispatch({ type: GET_HELP_REPORTS_REQUEST });
   // Request Headers
   const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
  };
  try {
    const body = JSON.stringify({ id });
    const url = config.apiUrl + 'help/getHelp';
    let res = await axios.post(url, body, options);
    setProfilePicture(res.data.data.pending, "pending");
    setProfilePicture(res.data.data.ongoing, "ongoing");
    dispatch({
      type: GET_HELP_REPORTS_SUCCESS,
      payload: { msg: "success", data: res.data },
    });
  }
  catch (e) {
    dispatch({
      type: GET_HELP_REPORTS_SUCCESS,
      payload: { msg: e.msg , data: {} },
    });
  }
}

export const setHelpStatus = ( user, status , id , token) => async dispatch => {

  dispatch({ type: UPDATE_HELP_REPORT_REQUEST });
   // Request Headers
   const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
    params: {
      id
    }
  };
  try {
    const body = JSON.stringify({ user , status });
    const url = config.apiUrl + 'help/setHelpStatus';
    let res = await axios.put(url, body, options);
    setProfilePicture(res.data.data.ongoing);
    dispatch({
      type: UPDATE_HELP_REPORT_SUCCESS,
      payload: { msg: "status updated", data: res.data },
    });
  }
  catch (e) {
    dispatch({
      type: UPDATE_HELP_REPORT_SUCCESS,
      payload: { msg: e.msg , data: {} },
    });
  }
}

export const updateChildFoundData = ( user, childPicture , note , id , token) => async dispatch => {

  dispatch({ type: UPDATE_FOUND_CHILD_REQUEST });
   // Request Headers
   const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
    params: {
      id
    }
  };
  try {
    const response = await fetch(childPicture);
    const blob = await response.blob();
    let imgName = uuidv4() + ".jpg";
    console.log("Image name:", imgName);
    var ref = Firebase.storage().ref().child("foundChild/" + imgName);
    await ref.put(blob);
    const body = JSON.stringify({ user, childPicture : imgName , note });
    const url = config.apiUrl + 'help/updateHelpData';
    let res = await axios.put(url, body, options);
    
    dispatch({
      type: UPDATE_FOUND_CHILD_SUCCESS,
      payload: { msg: "found data success", data: res.data , isFound : true },
    });
  }
  catch (e) {
    dispatch({
      type: UPDATE_FOUND_CHILD_SUCCESS,
      payload: { msg: e.msg , data: {} , isFound:false },
    });
  }
}

export async function setProfilePicture(result,status){

  if (status === "pending"){
     for (let i = 0; i < result.length; i++) {
    let ref = Firebase.storage().ref().child("profile/" + result[i].fromUserId + "/" + result[i].fromUserPicture);
    let url = await ref.getDownloadURL();
    result[i].fromUserPicture = url;
   }
  }
  else{
    for (let i = 0; i < result.length; i++) {
      if(result[i].status === "found"){
      let ref = Firebase.storage().ref().child("foundChild/" + result[i].childPicture);
      let url = await ref.getDownloadURL();
      result[i].childPicture = url;
      }
     }
  }
}