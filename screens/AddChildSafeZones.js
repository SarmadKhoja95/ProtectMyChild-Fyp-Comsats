import React, { useState, useEffect, useRef, createRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
  ActivityIndicator,

} from "react-native";
import { Block, Icon, Text, Button, Input } from "galio-framework";

import * as Location from 'expo-location';

import * as Permissions from 'expo-permissions';

import MapView, { Marker, Circle, PROVIDER_GOOGLE, } from 'react-native-maps';

//redux state
import { useSelector, useDispatch } from 'react-redux';
import { addChild } from "../api/dashboard/dashboardAction";

export default function AddChildSafeZones(props) {

  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [area, setArea] = useState({ longitude: 2, latitude: 2 });
  const [radius, setRadius] = useState(1000);
  const isLoading = useSelector(state => state.isLoading.ADD_CHILD);
  const user = useSelector(state => state.auth);
  const dashboard = useSelector(state => state.dashboard);

  const dispatch = useDispatch();


  useEffect(() => {
    if (status !== "granted") {
      getLocation();
    }
  });

  useEffect(() => {
    if (dashboard.isAdd) {
      props.navigation.replace("DashboardHome");
    }
  }, [dashboard.isAdd]);


  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
      //console.log(location);
      setArea({ longitude: parseFloat(location.coords.longitude), latitude: parseFloat(location.coords.latitude) });
      setLocation(location);
    }
    setStatus(status);
  };


  const saveChild = () => {
    let childData = props.route.params.childData;
    childData = { ...childData, safeZone: { latitude: area.latitude, longitude: area.longitude, radius: radius } };
    dispatch(addChild(user.data.token, childData));
  };

  const setCoordinates = e => {
    setArea({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude });
  }

  return (
    <View style={styles.container}>
      {status === "granted" ?
        <>
          <MapView
            zoomEnabled
            onPress={e => setCoordinates(e)}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }} style={styles.mapStyle}>
            <>
              <Circle
                draggable
                center={area}
                radius={radius}
                fillColor="rgba(112, 181, 44, 0.52)"
                strokeColor="rgba(85, 85, 85, 0.52)"
              />
            </>
          </MapView>
          <Block style={{ position: "absolute", top: 50, right: 30 }}>
          <Block>
              <TouchableOpacity onPress={() => setRadius(radius + 200)}>
                <Icon color="#95a5a6" name="plussquare" family="AntDesign" size={32} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRadius(radius - 200)}>
                <Icon color="#95a5a6" style={{ marginTop: 20 }} name="minussquare" family='AntDesign' size={32} />
              </TouchableOpacity>
            </Block>
            </Block>
          <Block style={styles.confirmOverlay} >
            <Button
              loading={isLoading}
              onPress={saveChild}
              style={styles.confirmButton}><Text color="#fff">Confirm</Text>
            </Button>
          </Block>
        </>
        :
        null
      }
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "openSans",
  },
  mapStyle: {
    width: "100%",
    height: "100%"
  },
  areaOverlay: {
    position: "absolute",
    top: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    zIndex: 5,
  },
  distanceStyle: {
    backgroundColor: "#7f8c8d",
    width: 80,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "#7f8c8d",
  },
  leftDistance: {
    marginRight: 10
  },
  rightDistance: {
    marginLeft: 10
  },
  confirmOverlay: {
    position: "absolute",
    bottom: 40,
  },
  videoOverlay: {
    position: "absolute",
    left: 10,
    bottom: 100
  },
  mapVideoOverlay: {
  },
  confirmButton: {
    width: 200,
    backgroundColor: "maroon"
  }
});