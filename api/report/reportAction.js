import axios from 'axios';
import config from '../../config/config.json';
import {
  GET_USER_REPORTS_REQUEST,
  GET_USER_REPORTS_SUCCESS,
  ADD_USER_REPORTS_REQUEST,
  ADD_USER_REPORTS_SUCCESS,
  GET_NEARBY_REPORTS_REQUEST,
  GET_NEARBY_REPORTS_SUCCESS,
  GET_ZONE_REPORTS_REQUEST,
  GET_ZONE_REPORTS_SUCCESS
}
  from '../types';

const isEmpty = require("lodash/isEmpty");

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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
    setProfilePicture(res.data.data.result);
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
    // get All nearby other user reports

export const getNearbyReports = (token) => async dispatch => {

  dispatch({ type: GET_NEARBY_REPORTS_REQUEST });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
  };
  try {
    let res =await axios.get(config.apiUrl + "reports/all", options);
    let allreports = res.data.data.result;
    let location = await getLocation();
    let nearby = allreports.filter((val)=>{
      let check = false;
      if(isEmpty(val.location) == false){
        //console.log(val.name);
        check = loc( location.latitude, location.longitude, val.location.latitude, val.location.longitude, 5 )
      }
      if(check){
        console.log(val.name);
        return val;
      }
    })
    setProfilePicture(nearby);
    dispatch({
      type: GET_NEARBY_REPORTS_SUCCESS,
      payload:  { result: nearby , total: nearby.length }
    });
  }
  catch (e) {
    dispatch({
      type: GET_NEARBY_REPORTS_SUCCESS,
      payload: false
    });
  }
}

export const checkIsZone = (token) => async dispatch => {

  dispatch({ type: GET_ZONE_REPORTS_REQUEST });
  // Request Headers
  const options = {
    headers: {
      'Content-type': config.ContentType,
      'x-auth-token': token
    },
  };
  try {
    let res =await axios.get(config.apiUrl + "reports/all", options);
    console.log("in get ZONE reports");
    let allreports = res.data.data.result;
    let location = await getLocation();
    let isZone = false;
    let v = allreports.filter((val)=>{
      let check = false;
      if(isEmpty(val.location) == false){
        check = loc( location.latitude, location.longitude, val.location.latitude, val.location.longitude, parseFloat(val.radius/1000) );
      }
      if(check){
       return val;
      }
    })
     if( isEmpty(v) === false ){
       isZone = true;
     }
    dispatch({
      type: GET_ZONE_REPORTS_SUCCESS,
      payload:  { result: allreports, isZone},
    });
  }
  catch (e) {
    dispatch({
      type: GET_ZONE_REPORTS_SUCCESS,
      payload: false
    });
  }
}

export async function setProfilePicture(result){
         for (let i = 0; i < result.length; i++) {
         let ref = Firebase.storage().ref().child("report/" + result[i].profilePicture);
         let url = await ref.getDownloadURL();
         result[i].profilePicture = url;
        }
}

function loc(userLatitude, userLongitude, midpointLatitude, midpointLongitude, rad) {

  let ky = 40000 / 360;

  let kx = Math.cos(Math.PI * midpointLatitude / 180.0) * ky;
  let dx = Math.abs(midpointLongitude - userLongitude) * kx;
  let dy = Math.abs(midpointLatitude - userLatitude) * ky;
  let final = Math.sqrt(dx * dx + dy * dy);
  
  if (final < rad)
    return true;

}

const getLocation = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === "granted") {
    let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    let result = { longitude: parseFloat(location.coords.longitude), latitude: parseFloat(location.coords.latitude) };
    return result;
  }
  else {
    getLocation();
  }
};