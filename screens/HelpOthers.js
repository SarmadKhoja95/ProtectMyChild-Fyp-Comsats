import React, { useState, useEffect } from "react";
import {
  StyleSheet, Image, Alert, Modal, View, TouchableOpacity
} from "react-native";
import { Block, Text, Icon } from "galio-framework";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import AwesomeAlert from 'react-native-awesome-alerts';


import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';


export default function HelpOthers(props) {
  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [locList, setLocList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [selectedChild, setSelectChild] = useState({});


  showAlert = () => {
    setAlert(true);
  };
 
  hideAlert = () => {
   setAlert(false);
  };
  useEffect(() => {
    if (status !== "granted") {
      getLocation();
    }
  });
  const markers = [{
    title: '8:05 PM',
    profile:"https://randomuser.me/api/portraits/men/45.jpg",
    coordinates: {
        latitude: 33.481195,
        longitude: 73.0853384,
    },
  },
  {
    title: '9:06 PM',
    profile:"https://randomuser.me/api/portraits/men/9.jpg",
    coordinates: {
        latitude: 33.489608,
        longitude: 73.0850208,
    },
 
  },
  {
    title: 'hey',
    profile:"https://randomuser.me/api/portraits/men/82.jpg",
    coordinates: {
        latitude: 32.489618,
        longitude: 73.1853384,
    },

  },,
  {
    title: 'hey',
    profile:"https://randomuser.me/api/portraits/men/74.jpg",
    coordinates: {
        latitude: 32.489618,
        longitude: 72.1853384,
    },

  },
  {
    title: 'hey',
    profile:"https://randomuser.me/api/portraits/men/40.jpg",
    coordinates: {
        latitude: 31.489618,
        longitude: 73.1853384,
    },

  },
  {
    title: 'hey',
    profile:"https://randomuser.me/api/portraits/women/5.jpg",
    coordinates: {
        latitude: 33.489618,
        longitude: 73.1853384,
    },

  },
  {
    title: 'hey',
    profile:"https://randomuser.me/api/portraits/lego/1.jpg",
    coordinates: {
        latitude: 32.489618,
        longitude: 74.1853384,
    },

  }]
  const showDirections = () => {
    Linking.openURL(`https://www.google.com/maps/dir/${location.latitude},${location.longitude}/${33.651710},${73.156411}`);
  }
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
                //title={marker.title}
                onPress={()=>{
                  //setModalVisible(true)
                  showAlert();
                  setSelectChild(marker);
                }}
               //onDragEnd={(e) => setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
            >
              <Block {...location} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Icon name="check-box-outline-blank" family="MaterialIcons" size={90} color="maroon" />
              <Icon name="location-on" family="MaterialIcons" size={90} color="maroon" style={{position: "absolute", top: 7, left: 0}}/>
              <Image style={{ zIndex: 2, height: 58, width: 58, position: "absolute", top: 17, left: 16}} source={{ uri: marker.profile }} />
            </Block>
            </Marker>
        })
        }
        </MapView>
        :
        null}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
              >       
          <View style={styles.modalStyle}>
          <View style={styles.modalView}>
            <Block row top>
                <Block flex={0.3}>
                <Image style={{ zIndex: 2, height: 80, width: 80, borderRadius: 40 }} source={{ uri: selectedChild.profile }} />
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
                <Icon name="user" family="AntDesign" size={28} style={{marginRight:"5%"}}/>
                <TouchableOpacity onPress={() =>{setModalVisible(false)}}><Text size={22}>Reported Data</Text></TouchableOpacity>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"lightgrey"}}>
                <Icon name="direction" family="Entypo" size={28} style={{marginRight:"5%"}}/>
                <TouchableOpacity onPress={() => {showDirections()}}><Text size={22}>Navigate to</Text></TouchableOpacity>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"lightgrey"}}>
                <Icon name="back" family="AntDesign" size={28} style={{marginRight:"5%"}}/>
                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}><Text size={22}>Back</Text></TouchableOpacity>
              </Block>
            </Block>  
          </View>
          </View>
      </Modal>
      <AwesomeAlert
          show={isAlert}
          showProgress={false}
          title="Help Confirmation"
          message="Are you sure you want to help ? After confirmation, Parent will be notified and you will receive the necessary information of the child upon approval."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Confirm"
          confirmButtonColor="#DD6B55"
          confirmButtonTextStyle={{fontSize:18,padding:2}}
          cancelButtonTextStyle={{fontSize:18}}
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
            setModalVisible(true);
          }}
        />
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