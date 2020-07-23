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

export default function AddChildLocation(props) {

  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [area, setArea] = useState({ longitude: 2, latitude: 2 });

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
    childData = { ...childData, position: area };
    props.navigation.navigate("AddChildSafeZones",{ childData })
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
              <Marker
                draggable
                coordinate={area}
                onDragEnd={e => setArea({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
              />
            </>
          </MapView>
          <Block style={styles.confirmOverlay} >
            <Button
              loading={isLoading}
              //onPress={()=>{props.navigation.navigate("AddChildSafeZones")}}
              onPress={saveChild}
              style={styles.confirmButton}><Text color="#fff">Add Safe Zone</Text>
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