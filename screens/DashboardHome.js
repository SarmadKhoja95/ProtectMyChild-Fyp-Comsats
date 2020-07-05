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
import Loading from "../components/Loading";
import appIcon from "../assets/icon2.png";

//redux state
import { useSelector, useDispatch } from 'react-redux';
import { getReports, getNearbyReports, checkIsZone } from "../api/report/reportAction";


export default function DashboardHome(props) {
  const [status, setStatus] = useState("pending");
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [modalVisible, setModalVisible] = useState(false);
  
  //redux state user
  const user = useSelector(state => state.auth);
  const report = useSelector(state => state.report.data);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading.GET_USER_REPORTS);

  useEffect(() => {
    dispatch(getReports(user.data.token));
  }, []);

  useEffect(() => {
    dispatch(getNearbyReports(user.data.token));
  }, []);

  useEffect(() => {
    dispatch(checkIsZone(user.data.token));
  }, []);
 
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

  return (
    <Block flex style={styles.container}>
      <Block row style={styles.topBar}>
        <Block row style={styles.topBarText}>
          <Image style={{ height: 70, width: 70  }} source={ appIcon } />
          <Text size={20} color="rgb(178,34,34)" bold>PMC</Text>
        </Block>
        <Block flex style={styles.topBarIcons}>
          <Icon name="dots-three-vertical" family="Entypo" size={20} color="maroon" />
        </Block>
      </Block>
      <Block row style={styles.sectopBar}>
      <TouchableOpacity onPress={()=>setModalVisible(true)}>
        <Image style={{ zIndex: 2, height: 63, width: 63, borderRadius: 30 }} source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} />
        </TouchableOpacity>
      <Icon name="plus" family="EvilIcons" size={60} color="white" />
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
            <Marker onPress={()=>setModalVisible(true)}
            coordinate={location}
            onDragEnd={(e) => setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}>
              <Block {...location}>
              <Icon name="enviroment" family="AntDesign" size={100} color="maroon" />
              <Image style={{ zIndex: 2, height: 63, width: 63, position: "absolute", top: 12, left: 19, borderRadius: 30 }} source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} />
            </Block>
          </Marker>
        </MapView>
        :
        null}
        <Loading show={isLoading} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
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
                <TouchableOpacity onPress={() =>{props.navigation.navigate("ChildProfile");setModalVisible(false)}}><Text size={22}>Profile</Text></TouchableOpacity>
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
    fontFamily: "openSans",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  topBar: {
    position: "absolute",
    top: 0,
    height: 85,
    backgroundColor: "rgb(255,255,255)",
    width: "100%",
    zIndex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    borderBottomWidth:0.5,
    borderBottomColor:"rgb(178,34,34)"
  },
  sectopBar: {
    position: "absolute",
    top: 85,
    height: 75,
    backgroundColor: "rgba(105,105,105, 0.5)",
    width: "100%",
    zIndex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center"
  },
  topBarText: {
    width: "85%",
    marginLeft:10,
    display:"flex",
    alignItems:"center"
  },
  topBarIcons: {
    width: "15%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  modalStyle:{
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,    
  },
});