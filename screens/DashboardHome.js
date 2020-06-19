import React, { useState, useEffect } from "react";
import {
  StyleSheet, Image, TouchableHighlight, Modal, View, TouchableOpacity
} from "react-native";
import { Block, Text, Icon } from "galio-framework";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';
import MapViewDirections from 'react-native-maps-directions';

export default function DashboardHome(props) {
  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [modalVisible, setModalVisible] = useState(false);
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
    Linking.openURL(`https://www.google.com/maps/dir/${location.latitude},${location.longitude}/${33.651710},${73.156411}`);
  }
// console.log(modalVisible);
  return (
    <Block flex style={styles.container}>
      <Block row style={styles.topBar}>
        <Block style={styles.topBarText}>
          <Text size={20} color="#fff" bold>PMC</Text>
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
            <Marker draggable onPress={()=>setModalVisible(true)}
            coordinate={location}
            onDragEnd={(e) => setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}>
              <Block {...location}>
                {/* <Text>Modal</Text> */}
              <Icon name="enviroment" family="AntDesign" size={100} color="maroon" />
              <Image style={{ zIndex: 2, height: 50, width: 50, position: "absolute", top: 22, left: 25, borderRadius: 25 }} source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} />
            </Block>
          </Marker>
          {/* <MapViewDirections
            rotateEnabled
            loadingEnabled
            splitWaypoints
            optimizeWaypoints
            origin={location}
            destination={{ latitude: 33.651710 , longitude: 73.156411 , }}
            apikey={"AIzaSyCzQOxsRMtSvb0b5kudTGgObKJYey2AyI4"}
            strokeWidth={5}
            strokeColor="#BF0A30"
          /> */}
        </MapView>
        :
        null}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
              >       
          <View style={styles.modalStyle}>
          <View style={styles.modalView}>
            <Block row top>
                <Block flex={0.3}>
                <Image style={{ zIndex: 2, height: 80, width: 80, borderRadius: 40 }} source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} />
                </Block>
                <Block flex={0.8} style={{marginLeft:15,paddingLeft:15}}>
                <Text size={30} bold>John</Text>
                <Block row> 
                <Block flex={0.5}>
                <Text size={15} color="grey">Coordinates:</Text>
                <Text size={15} color="grey">Accuracy:</Text>
                <Text size={15} color="grey">Last update:</Text>
                </Block>
                <Block flex={0.5}>
                <Text size={15} color="grey">48.95,55.30</Text>
                <Text size={15} color="grey">775m LBS</Text>
                <Text size={15} color="grey">12:30 19/06</Text>
                </Block>
                </Block>
                </Block>
            </Block>
            <Block style={{backgroundColor:"white",width:"100%",marginTop:20,borderWidth:0.5,borderColor:"lightgrey"}}>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"lightgrey"}}>
                <Icon name="call" family="MaterialIcons" size={28} style={{marginRight:"5%"}}/>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}><Text size={22}>Call</Text></TouchableOpacity>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"lightgrey"}}>
                <Icon name="history" family="MaterialIcons" size={28} style={{marginRight:"5%"}}/>
                <TouchableOpacity onPress={() => {props.navigation.navigate("LocationHistory");setModalVisible(false)}}><Text size={22}>History</Text></TouchableOpacity>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"lightgrey"}}>
                <Icon name="direction" family="Entypo" size={28} style={{marginRight:"5%"}}/>
                <TouchableOpacity onPress={() => {showDirections()}}><Text size={22}>Navigate to</Text></TouchableOpacity>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"lightgrey"}}>
                <Icon name="user" family="AntDesign" size={28} style={{marginRight:"5%"}}/>
                <TouchableOpacity onPress={() =>{props.navigation.navigate("ChildProfile"); }}><Text size={22}>Profile</Text></TouchableOpacity>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"lightgrey"}}>
                <Icon name="back" family="AntDesign" size={28} style={{marginRight:"5%"}}/>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}><Text size={22}>Back</Text></TouchableOpacity>
              </Block>
            </Block>  
          </View>
          </View>
      </Modal>
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