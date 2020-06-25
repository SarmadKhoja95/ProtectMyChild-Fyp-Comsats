import React, { useState, useEffect, useRef, createRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Block, Icon, Text, Button, Input } from "galio-framework";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Circle } from 'react-native-maps';

//redux state
import { useSelector, useDispatch } from 'react-redux';
import { addReport } from "../api/report/reportAction";

export default function AddLocation(props) {

  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [radius, setRadius] = useState(1000);
  const [area, setArea] = useState({ longitude: 2, latitude: 2 });
  
  const areaHandler = useRef();
  const circle = createRef(null);

  const user = useSelector(state => state.auth);
  const report = useSelector(state => state.report);
  const isLoading = useSelector(state => state.isLoading.ADD_USER_REPORTS);
  const dispatch = useDispatch();

  useEffect(() => {
    if (report.isAdd) {
      props.navigation.navigate("SelectReports");
    }
  }, [report.isAdd]);


  useEffect(() => {
    areaHandler.current = area;
  }, [area]);

  useEffect(() => {
    if (status !== "granted") {
      getLocation();
    }
  });


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


  const saveReport = () => {
    let data = props.route.params.data;
    dispatch(addReport(data.Name, data.Age, data.profilePicture, data.City, area, radius, data.Dress, data.Gender, data.addInfo, user.data.token, report.data.data.result));
  }

  return (
    <View style={styles.container}>
      {status === "granted" ?
        <>
          <MapView
            zoomEnabled
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
              <Circle
                draggable
                center={area}
                radius={radius}
                fillColor="rgba(112, 181, 44, 0.52)"
                strokeColor="rgba(85, 85, 85, 0.52)"
              />
            </>
          </MapView>
          <Block style={{ position: "absolute", top: 50, left: 10 }}>
            <Block>
              <TouchableOpacity onPress={() => setRadius(radius + 200)}>
                <Icon color="#95a5a6" name="plussquare" family="AntDesign" size={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRadius(radius - 200)}>
                <Icon color="#95a5a6" style={{ marginTop: 20 }} name="minussquare" family='AntDesign' size={30} />
              </TouchableOpacity>
            </Block>
          </Block>
            <Block style={styles.areaOverlay}>
              <Input type="number-pad" bgColor="grey" placeholder="Type Radius" placeholderTextColor="white" color="white" style={{ height: 50 }}
                defaultValue={"1000"}
                value={radius}
                onChangeText={value => { setRadius(Number(value)); }} />
            </Block>
          <Block style={styles.confirmOverlay} >
            <Button
              loading={isLoading}
              onPress={saveReport}
              style={styles.confirmButton}><Text color="#fff">Confirm</Text>
            </Button>
          </Block>
        </>
        :
        null}
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