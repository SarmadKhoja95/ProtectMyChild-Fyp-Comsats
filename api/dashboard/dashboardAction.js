import axios from 'axios';
import config from '../../config/config.json';
import {
  GET_CHILDREN_SUCCESS,
  GET_CHILDREN_REQUEST,
  ADD_CHILD_REQUEST,
  ADD_CHILD_SUCCESS,
  RESET_ADD_CHILD
}
  from '../types';

import { v4 as uuidv4 } from "react-native-uuid";
import Firebase from "../../firebase";


export const addChild = (token, childData) => async dispatch => {

  dispatch({ type: ADD_CHILD_REQUEST });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
  };
  try {
    const response = await fetch(childData.picture);
    const blob = await response.blob();
    let imgName = uuidv4() + ".jpg";
    console.log("Image name:", imgName);
    var ref = Firebase.storage().ref().child("children/" + imgName);
    await ref.put(blob);
    childData.picture = imgName;
    const body = JSON.stringify(childData);
    const url = config.apiUrl + 'children/';
    await axios.post(url, body, options);

    dispatch(getChildrenWithoutInterval(token));
    dispatch({
      type: ADD_CHILD_SUCCESS,
      payload: true
    });
  }
  catch (e) {
    dispatch({
      type: ADD_CHILD_SUCCESS,
      payload: false,
    });
  }
}

export const getChildrenWithoutInterval = token => async dispatch => {
  dispatch({ type: GET_CHILDREN_REQUEST });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
  };
  try {
    let res = await axios.get(config.apiUrl + "children/parent/", options);
    let childrens = res.data.data;
    for (let i = 0; i < childrens.length; i++) {
      let ref = Firebase.storage().ref().child("children/" + childrens[i].picture);
      let url = await ref.getDownloadURL();
      childrens[i].picture = url;
    }
    dispatch({
      type: GET_CHILDREN_SUCCESS,
      payload: { msg: "success", data: childrens }
    });
  }
  catch (e) {
    console.log(e.message);
    dispatch({
      type: GET_CHILDREN_SUCCESS,
      payload: { msg: e.message, data: [] },
    });
  }
};

export const getChildren = (token) => async dispatch => {

  const getChildrenApi = async () => {
    dispatch({ type: GET_CHILDREN_REQUEST });
    // Request Headers
    const options = {
      headers: {
        'Content-type': config.ContentType,
        'x-auth-token': token
      },
    };
    try {
      let res = await axios.get(config.apiUrl + "children/parent/", options);
      let childrens = res.data.data;

      for (let i = 0; i < childrens.length; i++) {

        let check = false; 
        check = loc( parseFloat(childrens[i].position.latitude), parseFloat(childrens[i].position.longitude), parseFloat(childrens[i].safeZone.latitude), parseFloat(childrens[i].safeZone.longitude), parseFloat(childrens[i].safeZone.radius)/1000 );
        if(check){ 
          let title ="Alert";
          let msg = childrens[i].name + " is going out of Safe Zone ! You must submit a report if its dangerous !";
          sendNotification("ExponentPushToken[obP6FfOGA1IKdqjD1lRj0E]", title , "Found Child Data", msg);
        }
      }

      for (let i = 0; i < childrens.length; i++) {
        let ref = Firebase.storage().ref().child("children/" + childrens[i].picture);
        let url = await ref.getDownloadURL();
        childrens[i].picture = url;
      }

      dispatch({
        type: GET_CHILDREN_SUCCESS,
        payload: { msg: "success", data: childrens }
      });
    }
    catch (e) {
      console.log(e.message);
      dispatch({
        type: GET_CHILDREN_SUCCESS,
        payload: { msg: e.message, data: [] },
      });
    }
  };
  getChildrenApi();

  setInterval(() => {
    getChildrenApi(); 
  }, 90000);        
}

export const resetAddChild = () => dispatch => {
  dispatch({
    type: RESET_ADD_CHILD
  });
};

function loc(userLatitude, userLongitude, midpointLatitude, midpointLongitude, rad) {
  
  let ky = 40000 / 360;
  let kx = Math.cos(Math.PI * midpointLatitude / 180.0) * ky;
  let dx = Math.abs(midpointLongitude - userLongitude) * kx;
  let dy = Math.abs(midpointLatitude - userLatitude) * ky;
  let final = Math.sqrt(dx * dx + dy * dy);
  if (final > rad)
    return true;
}

async function sendNotification(pushToken, title, data, message) {
  let url = "https://exp.host/--/api/v2/push/send";
  let options = {
      headers: {
          'host': 'exp.host',
          'accept': 'application/json',
          'accept-encoding': 'gzip, deflate',
          'content-type': 'application/json',
      }
  };
  let body = JSON.stringify({ to: pushToken, title, data: { data }, body: message });
  await axios.post(url, body, options);
}