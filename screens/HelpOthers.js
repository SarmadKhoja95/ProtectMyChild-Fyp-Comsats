import React, { useState, useEffect } from "react";
import {
  StyleSheet, Image, Alert, Modal, View, TouchableOpacity
} from "react-native";
import { Block, Text, Icon } from "galio-framework";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import AwesomeAlert from 'react-native-awesome-alerts';
import MapView, { Marker , Circle} from 'react-native-maps';
import * as Linking from 'expo-linking';
import moment from "moment";
import Loading from "../components/Loading";

//redux state
import { useSelector, useDispatch } from 'react-redux';

export default function HelpOthers(props) {
  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [modalVisible, setModalVisible] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [selectedChild, setSelectChild] = useState({});
  const [selectedlocation, setSelectedLocation] = useState({ longitude: null, latitude: null });

  const isLoading = useSelector(state => state.isLoading.GET_NEARBY_REPORTS);
  const nearbyReports = useSelector(state => state.report.isNearby);

  const showAlert = () => {
    setAlert(true);
  };
 
  const hideAlert = () => {
   setAlert(false);
  };
 
  useEffect(() => {
    if (status !== "granted") {
      getLocation();
    }
  });
  
  const navigateTo = (des) => {
    Linking.openURL(`https://www.google.com/maps/dir/${location.latitude},${location.longitude}/${des.latitude},${des.longitude}`);
  }

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
      {status === "granted" ?
        <MapView initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
          style={styles.mapStyle}>
          {nearbyReports.result.map((val) => {
           return <Marker
                coordinate={val.location}
                onPress={()=>{
                  showAlert();
                  setSelectChild(val);
                  setSelectedLocation(val.location);
                }}
            >
              <Block {...location} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Icon name="check-box-outline-blank" family="MaterialIcons" size={90} color="maroon" />
              <Icon name="location-on" family="MaterialIcons" size={90} color="maroon" style={{position: "absolute", top: 7, left: 0}}/>
              <Image style={{ zIndex: 2, height: 58, width: 58, position: "absolute", top: 17, left: 16}} source={{ uri: val.profilePicture }} />
            </Block>
            </Marker> 
        })
        }
         <Circle
           center={location}
           radius={5000}
           fillColor="rgba(112, 181, 44, 0.22)"
           strokeColor="rgba(85, 85, 100, 0.42)"
           />
        </MapView>
        :
        null}
          <Block style={{ position: "absolute", top: 60 , backgroundColor:"rgba(128,0,0,0.8)",paddingTop:15,paddingBottom:15,paddingRight:20,paddingLeft:20}}>
               <Block row style={{display:"flex",alignItems:"center"}}> 
               <Text size={18} color="white">{nearbyReports.total} Reports found near you</Text>
             </Block>
            </Block>
       <Loading show={isLoading} />
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
              >       
          <Block flex={0.95} style={{padding:20}}>
          <View style={styles.modalView}>
            <Block row top style={{paddingBottom:20}}>
            <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
              <Icon name="left" family="AntDesign" size={30}/>
              </TouchableOpacity>
            </Block>
            <Block middle>
                <Image style={{ height: 150, width: "100%", resizeMode:"cover" }} source={{ uri: selectedChild.profilePicture }} />
                </Block>
                <Block row middle style={{paddingTop:15}}>
                <Block flex={0.8} top>
                <Block row space="between" style={{width:"100%",alignItems:"center",marginBottom:5}}>
                <Text size={30} bold >{selectedChild.name}</Text>
                <TouchableOpacity onPress={()=>navigateTo(selectedlocation)}><Icon name="direction" family="Entypo" size={25} color="maroon" /></TouchableOpacity>
                </Block>
                <Block row space="between" style={{width:"100%"}}> 
                <Block flex={0.5}>
                <Text size={15} color="grey">Longitude:</Text>
                <Text size={15} color="grey">Latitude:</Text>
                <Text size={15} color="grey">Radius:</Text>
                <Text size={15} color="grey">Last update:</Text>
                <Text size={15} color="grey">Age:</Text>
                <Text size={15} color="grey">Gender:</Text>
                <Text size={15} color="grey">Wearing:</Text>
                <Text size={15} color="grey">City:</Text>
                <Text size={15} color="grey">Additional Info:</Text>
                </Block>
                <Block flex={0.65} bottom>
                <Text size={15} color="grey">{selectedlocation.longitude || null}</Text>
                <Text size={15} color="grey">{selectedlocation.latitude || null}</Text>
                <Text size={15} color="grey">{selectedChild.radius} meters</Text>
                <Text size={15} color="grey">{moment(selectedChild.updatedAt).startOf('hour').fromNow()}</Text>
                <Text size={15} color="grey">{selectedChild.age}</Text>
                <Text size={15} color="grey">{selectedChild.gender}</Text>
                <Text size={15} color="grey">{selectedChild.wearing}</Text>
                <Text size={15} color="grey">{selectedChild.city}</Text>
                <Text size={15} color="grey">{selectedChild.info}</Text>
                </Block>
                </Block>
                </Block>
            </Block>
          </View>
          </Block>
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
        width:"95%",

      },
      modalView: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,        
      },
    });