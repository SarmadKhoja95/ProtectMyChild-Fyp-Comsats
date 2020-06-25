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


export default function Analytics(props) {

  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [radius, setRadius] = useState(1000);
  const [area, setArea] = useState({ longitude: 2, latitude: 2 });
  const areaHandler = useRef();
  const circle = createRef(null);

  const areas = [{
    title: '8:05 PM',
    type:"report",
    coordinates: {
        latitude: 33.481195,
        longitude: 73.0853384,
    },
  },
  {
    title: '9:06 PM',
    type:"lost",
    coordinates: {
        latitude: 33.489608,
        longitude: 73.0850208,
    },
 
  },
  {
    title: 'hey',
    type:"report",
    coordinates: {
        latitude: 32.489618,
        longitude: 73.1853384,
    },

  },,
  {
    title: 'hey',
    type:"report",
    coordinates: {
        latitude: 32.489618,
        longitude: 72.1853384,
    },

  },
  {
    title: 'hey',
    type:"lost",
    coordinates: {
        latitude: 31.489618,
        longitude: 73.1853384,
    },

  },
  {
    title: 'hey',
    type:"lost",
    coordinates: {
        latitude: 33.489618,
        longitude: 73.1853384,
    },
  }]

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
                    { areas.map((area) => {
                        return <Circle
                              center={area.coordinates}
                              radius={radius}
                              fillColor={ area.type == "report" ? "rgba(178,34,34 , 0.6)" : "rgba(112, 181, 44, 0.52)" }
                              strokeColor="rgba(85, 85, 100, 0.52)"
                              />        })
                     }
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
            <Block style={{ position: "absolute", top: 50, right: 20 , backgroundColor:"white",padding:10}}>
              <Block row style={{display:"flex",alignItems:"center"}}> 
                <Icon color="rgb(178,34,34)" name="controller-record" family="Entypo" size={30} />
                <Text size={15} style={{paddingLeft:5}}>Reported cases</Text>
              </Block>
              <Block row style={{display:"flex",alignItems:"center"}}>
                <Icon color="rgb(112, 181, 44)" name="controller-record" family="Entypo" size={30} />
                <Text size={15} style={{paddingLeft:5}}>Lost cases</Text>
              </Block>
            </Block>
            <Block style={{ position: "absolute", bottom: 20 , backgroundColor:"maroon",padding:15,borderRadius:30}}>
              <Block row style={{display:"flex",alignItems:"center"}}> 
                
                <Text size={18} color="white" style={{paddingLeft:5}}>You are in safe zone</Text>
              </Block>
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