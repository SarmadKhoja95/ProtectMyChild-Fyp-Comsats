import React, { useState, useEffect } from "react";
import {
  StyleSheet, Image, TouchableHighlight, Modal, View, TouchableOpacity
} from "react-native";
import { Block, Text, Icon } from "galio-framework";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { Marker } from 'react-native-maps';



export default function MapHistory(props) {
  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [locList, setLocList] = useState([]);

  useEffect(() => {
    if (status !== "granted") {
      getLocation();
    }
  });
  const markers = [{
    title: '8:05 PM',
    coordinates: {
        latitude: 33.481195,
        longitude: 73.0853384,
    },
  },
  {
    title: '9:06 PM',
    coordinates: {
        latitude: 33.489608,
        longitude: 73.0850208,
    },
 
  },
  {
    title: 'hey',
    coordinates: {
        latitude: 32.489618,
        longitude: 73.1853384,
    },

  },,
  {
    title: 'hey',
    coordinates: {
        latitude: 32.489618,
        longitude: 72.1853384,
    },

  },
  {
    title: 'hey',
    coordinates: {
        latitude: 31.489618,
        longitude: 73.1853384,
    },

  },
  {
    title: 'hey',
    coordinates: {
        latitude: 33.489618,
        longitude: 73.1853384,
    },

  },
  {
    title: 'hey',
    coordinates: {
        latitude: 32.489618,
        longitude: 74.1853384,
    },

  }]

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
      setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      setLocList(markers);
    }
    setStatus(status);
  };

  return (
    <Block flex style={styles.container}>
      {status === "granted" ?
        <MapView initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
          //onPress={e => setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
          style={styles.mapStyle}>
       {
        markers.map((marker) => {
           return <Marker
                coordinate={{latitude: marker.coordinates.latitude, longitude: marker.coordinates.longitude}}
                title={marker.title}
               //onDragEnd={(e) => setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
            />
        })
        }
        </MapView>
        :
        null}
        </Block>
     );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        fontFamily: "openSans",
      },
      mapStyle: {
        width: "100%",
        height: "100%",
      },
      topBar: {
        position: "absolute",
        top: 0,
        height: 80,
        backgroundColor: "maroon",
        width: "100%",
        zIndex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center"
      },
      topBarText: {
        width: "50%",
      },
      topBarIcons: {
        width: "50%",
        flexDirection: "row",
        justifyContent: "space-around"
      },
      modalStyle:{
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        //width:"80%",
      },
      modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 50,
        //marginBottom:10,
        backgroundColor: "white",
        //borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        //elevation: 15,
        
      },
    });