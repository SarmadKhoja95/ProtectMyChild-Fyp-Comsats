import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Text, Button } from "galio-framework";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import * as Linking from 'expo-linking';
import MapViewDirections from 'react-native-maps-directions';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function ReportLocation(props) {
  const [status, setStatus] = useState("pending");
  const [currentlocation, setLocation] = useState({ longitude: null, latitude: null });

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

  const showDirections = () => {
    Linking.openURL(`https://www.google.com/maps/dir/${currentlocation.latitude},${currentlocation.longitude}/${props.route.params.location.latitude},${props.route.params.location.longitude}`);
  }

  return (
    <View style={styles.container}>
      {status === "granted" ?
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          followsUserLocation
          rotateEnabled
          initialRegion={{
            latitude: currentlocation.latitude,
            longitude: currentlocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.mapStyle}>
          <Marker
            coordinate={{ latitude: props.route.params.location.latitude, longitude: props.route.params.location.longitude, }}
          />
          <MapViewDirections
            rotateEnabled
            loadingEnabled
            splitWaypoints
            optimizeWaypoints
            origin={currentlocation}
            destination={{ latitude: props.route.params.location.latitude, longitude: props.route.params.location.longitude, }}
            apikey={"AIzaSyCzQOxsRMtSvb0b5kudTGgObKJYey2AyI4"}
            strokeWidth={5}
            strokeColor="#BF0A30"
          />
        </MapView>
        : null}
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button onPress={() => showDirections()} style={{ width: 150 }} uppercase color="#800000">Directions</Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});
