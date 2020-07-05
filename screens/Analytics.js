import React, { useState, useEffect, useRef, createRef } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { Block, Icon, Text, Button, Input } from "galio-framework";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Circle } from 'react-native-maps';

//redux state
import { useSelector, useDispatch } from 'react-redux';

export default function Analytics(props) {

  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [area, setArea] = useState({ longitude: 2, latitude: 2 });
  const areaHandler = useRef();
  const isZone = useSelector(state => state.report.isZone);

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
      setArea({ longitude: parseFloat(location.coords.longitude), latitude: parseFloat(location.coords.latitude) });
      setLocation(location);
    }
    setStatus(status);
  };

  return (
    <View style={styles.container}>
      {status === "granted" ?
        <>
            <MapView
              zoomEnabled
              showsUserLocation
              showsMyLocationButton
              moveOnMarkerPress
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }} style={styles.mapStyle}>
                <>
                    { isZone.result.map((row) => {
                        return ( <>
                                <Marker
                                coordinate={row.location}
                                />
                              <Circle
                              center={row.location}
                              radius={row.radius}
                              fillColor="rgba(178,34,34 , 0.4)"
                              strokeColor="rgba(85, 85, 100, 0.42)"
                              />
                              </> );})
                     }
                </>
            </MapView>
            <Block style={{ position: "absolute", top: 50, right: 20 , backgroundColor:"white",padding:10}}>
              <Block row style={{display:"flex",alignItems:"center"}}> 
                <Icon color="rgb(178,34,34)" name="controller-record" family="Entypo" size={30} />
                <Text size={15} style={{paddingLeft:5}}>Reported cases</Text>
              </Block>
            </Block>
            {isZone.isZone ?
              <Block style={{ position: "absolute", bottom: 20 , backgroundColor:"maroon",padding:15,borderRadius:30}}>
               <Block row style={{display:"flex",alignItems:"center"}}> 
               <Text size={18} color="white">You are in reported zone</Text>
             </Block>
            </Block>
            :
            <Block style={{ position: "absolute", bottom: 20 , backgroundColor:"rgba(112, 181, 44, 0.9)",padding:15,borderRadius:30}}>
               <Block row style={{display:"flex",alignItems:"center"}}> 
               <Text size={18} color="white">You are in safe zone</Text>
             </Block>
            </Block>}
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