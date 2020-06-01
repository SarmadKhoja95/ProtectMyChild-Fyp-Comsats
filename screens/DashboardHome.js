import React, { useState, useEffect } from "react";
import {
  StyleSheet, Image
} from "react-native";
import { Block, Text, Icon } from "galio-framework";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { Marker } from 'react-native-maps';

export default function DashboardHome(props) {
  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });

  useEffect(() => {
    if (status !== "granted") {
      getLocation();
    }
  });

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
      setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    }
    setStatus(status);
  };

  return (
    <Block flex style={styles.container}>
      <Block row style={styles.topBar}>
        <Block style={styles.topBarText}>
          <Text size={15} color="#fff">KidControl</Text>
        </Block>
        <Block flex style={styles.topBarIcons}>
          <Icon name="adduser" family="AntDesign" size={20} color="#fff" />
          <Icon name="reload1" family="AntDesign" size={20} color="#fff" />
          <Icon name="dots-three-vertical" family="Entypo" size={20} color="#fff" />
        </Block>
      </Block>
      {status === "granted" ?
        <MapView initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
          onPress={e => setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
          style={styles.mapStyle}>
          <Marker draggable
            coordinate={location}
            onDragEnd={(e) => setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
          >
            <Block {...location}>
              <Icon name="enviroment" family="AntDesign" size={100} color="maroon" />
              <Image style={{ zIndex: 2, height: 50, width: 50, position: "absolute", top: 22, left: 25, borderRadius: 25 }} source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} />
            </Block>
          </Marker>
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
    height: 60,
    backgroundColor: "maroon",
    width: "100%",
    zIndex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center"
  },
  topBarText: {
    width: "50%"
  },
  topBarIcons: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});