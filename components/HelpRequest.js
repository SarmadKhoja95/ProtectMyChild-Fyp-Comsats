import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity, StatusBar, FlatList, Modal, ToastAndroid
  
} from "react-native";
import { Block, Text, Button, Icon } from 'galio-framework';
import Loading from "../components/Loading";
import Constants from "expo-constants";
import moment from "moment";
import * as Linking from 'expo-linking';
// Icons
import cityIcon from "../assets/city.png";
import ageIcon from "../assets/age.png";
import genderIcon from "../assets/gender.png";
import infoIcon from "../assets/info.png";
import dressIcon from "../assets/shirt.png";
//redux state
import { useSelector, useDispatch } from 'react-redux';
import { setHelpStatus , getHelpReports } from "../api/help/helpAction";

function EmptyList() {
    return (
      <Block flex middle style={{ paddingTop: 20 }}>
        <Text h5>No help data found !</Text>
      </Block>
    );
  }
  
  function Item(props) {
  
    return (
      <>
      <Block middle style={{padding:10,paddingBottom:0}}>
       {props.item.status === "pending" ?
       <Text h3 color="maroon">Help Requests</Text>
       :
       <Text h3 color="maroon">Helping Parents</Text>}
          <Icon name="minus" family="AntDesign" size={70} color="maroon" style={{margin:-15}}/>
          </Block>
      <Block style={styles.item}>
      <Block flex={1} row>
        <Block flex={0.2} center>
        <TouchableOpacity onPress={()=>props.viewPicture(props.item)}>
        <Image style={{ height: 80, width: 80, backgroundColor:"grey" }} source={{ uri: props.item.fromUserPicture}} />
        </TouchableOpacity>
        </Block>
        <Block flex={0.4}top style={{paddingLeft:15}}>
        <Text size={18} bold>{props.item.fromUserName}</Text>
        <Text size={15} color="grey">{props.item.fromUserCity || "Unknown city"}</Text>
        <Text size={15} color="grey">{props.item.fromUserEmail}</Text>
        <Text size={15} color="grey">{props.item.fromUserContact || "Phone not found"}</Text>
        </Block>
        <Block flex={0.3} middle>
          <TouchableOpacity onPress={()=> props.viewDetail(props.item.reportData)}>
          <Icon name="eye" family="Entypo" color="black" size={25} style={{ padding: 3 }} />
        </TouchableOpacity>
        </Block>
        {props.item.status === "pending" ?
        <Block flex={0.15} space="around">
        <TouchableOpacity onPress={() => props.changeStatus(props.item._id)}>
          <Icon name="checkcircleo" color="green" family="AntDesign" size={25} style={{ padding: 3 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.viewLocation(props.item)}>
          <Icon name="closecircleo" color="maroon" family="AntDesign" size={25} style={{ padding: 3 }} />
        </TouchableOpacity>
        </Block>
        :
        <Block flex={0.25} middle>
          {props.item.status === "ongoing" ?
          <TouchableOpacity onPress={() => ToastAndroid.show('Parent is in search of your child. You will be notified in case if he/she manage to find your child', ToastAndroid.SHORT)}>
          <Icon name="radio" color="maroon" family="Feather" size={25} style={{ padding: 3 }} />
          </TouchableOpacity>
          :
          <Block middle>
          <TouchableOpacity onPress={() => props.viewFoundPic(props.item)}>
          <Icon name="picture" color="maroon" family="AntDesign" size={35} style={{ paddingLeft:20 }} />
          <Text size={13} bold>Show Picture</Text>
          </TouchableOpacity>
          </Block>}
        </Block>}
      </Block>
      </Block>
      </>
    );
  }  

export default function HelpRequest( props ) {

const [modalVisible, setModalVisible] = useState(false);
const [picModal, setPicModal] = useState(false);
const [foundModal, setFoundModal] = useState(false);
const [viewItem, setItem] = useState({});
const [viewItemLocation, setItemLocation] = useState({ longitude: null, latitude: null });
const dispatch = useDispatch();
const user = useSelector(state => state.auth);
const isStatusLoading = useSelector(state => state.isLoading.UPDATE_HELP_REPORT);
const isHelpLoading = useSelector(state => state.isLoading.GET_HELP_REPORTS);


useEffect(() => {
  dispatch(getHelpReports(user.data.user._id, user.data.token));
}, []);

const callParent = (phone) => {
  Linking.openURL(`tel://${phone}`);
}

const viewLocation = (item) => {
    props.navigation.navigate("ReportLocation", { location: item.location , radius : item.radius });
  }

  const changeStatus = (id) => {
    dispatch(setHelpStatus("ongoing", id,  user.data.token));
    }

 const viewDetail = (item) => {
     setModalVisible(true);
     setItemLocation(item.location);
     setItem(item);
  }
  const viewPicture = (item) => {
    setPicModal(true);
    setItem(item);
 }
 const viewFoundPic = (item) => {
  setFoundModal(true);
  setItem(item);
}

  return (
      <View style={styles.container}>
        <FlatList
           data={props.route.params.results}
          ListEmptyComponent={<EmptyList />}
          renderItem={({ item }) => <Item item={item} changeStatus={changeStatus} viewLocation={viewLocation} viewDetail={viewDetail} viewPicture={viewPicture} viewFoundPic={viewFoundPic} />}
          keyExtractor={item => item.id}
        />
        <Loading show={isStatusLoading} />
        <Loading show={isHelpLoading} />
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
              >     
          <View style={styles.modalStyle}>
          <View style={styles.modalView}>
            <Block top style={{paddingBottom:20}}>
            <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
              <Icon name="left" family="AntDesign" size={30}/>
              </TouchableOpacity>
            </Block>
            <Block middle>
                <Image style={{ height: 150, width: "100%", resizeMode:"cover" }} source={{ uri: viewItem.profilePicture }} />
                </Block>
            <Block row middle style={{paddingTop:15}}>
                <Block flex={0.8} top>
                <Text size={30} bold style={{marginBottom:5}}>{viewItem.name}</Text>
                <Block row top> 
                <Block top>
                <Text size={15} color="grey">Longitude:</Text>
                <Text size={15} color="grey">Latitude:</Text>
                <Text size={15} color="grey">Radius:</Text>
                <Text size={15} color="grey">Last update:</Text>
                </Block>
                <Block top style={{paddingLeft:30}}>
                <Text size={15} color="grey">{viewItemLocation.longitude || null}</Text>
                <Text size={15} color="grey">{viewItemLocation.latitude || null}</Text>
                <Text size={15} color="grey">{viewItem.radius} meters</Text>
                <Text size={15} color="grey">{moment(viewItem.updatedAt).startOf('hour').fromNow()}</Text>
                </Block>
                </Block>
                </Block>
            </Block>
            <Block style={{backgroundColor:"white",width:"100%",marginTop:20,borderWidth:0.5,borderColor:"black",borderBottomWidth:0}}>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"black"}}>
                <Block flex={0.15} row top>
                <Image style={{ height: 26, width: 26 }} source= {ageIcon}/>
                </Block>
                <Block flex={0.3}>
                  <Text size={18}>Age</Text>
                </Block>
                <Block flex={0.6} bottom>
                  <Text size={18}>{viewItem.age}</Text>
                </Block>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"black"}}>
                <Block flex={0.15} row top>
                <Image style={{ height: 26, width: 26 }} source= {genderIcon}/>
                </Block>
                <Block flex={0.3}>
                  <Text size={18}>Gender</Text>
                </Block>
                <Block flex={0.6} bottom>
                  <Text size={18}>{viewItem.gender}</Text>
                </Block>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"black"}}>
                <Block flex={0.15} row top>
                <Image style={{ height: 26, width: 26 }} source= {cityIcon}/>
                </Block>
                <Block flex={0.3}>
                  <Text size={18}>City</Text>
                </Block>
                <Block flex={0.6} bottom>
                  <Text size={18}>{viewItem.city}</Text>
                </Block>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"black"}}>
                <Block flex={0.15} row top>
                <Image style={{ height: 26, width: 26 }} source= {dressIcon}/>
                </Block>
                <Block flex={0.3}>
                  <Text size={18}>Wearing</Text>
                </Block>
                <Block flex={0.6} bottom>
                  <Text size={18}>{viewItem.wearing}</Text>
                </Block>
              </Block>
              <Block row style={{padding:10,borderBottomWidth:0.5,borderColor:"black"}}>
                <Block flex={0.15} row top>
                <Image style={{ height: 26, width: 26 }} source= {infoIcon}/>
                </Block>
                <Block flex={0.3} top>
                  <Text size={18}>Info</Text>
                </Block>
                <Block flex={0.6} bottom>
                  <Text size={15}>{viewItem.info}</Text>
                </Block>
              </Block>
            </Block>
          </View>
          </View>
      </Modal>
       {/* Picture Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={picModal}
            onRequestClose={() => {
              setPicModal(false);
            }}
              >     
          <View style={styles.picModalStyle}>
          <View style={styles.picModalView}>
            <Block row bottom>
            <TouchableOpacity onPress={()=>setPicModal(!picModal)}>
              <Icon name="closecircleo" family="AntDesign" size={30} color="maroon" style={{marginRight:10,marginBottom:10}}/>
              </TouchableOpacity>
            </Block>
            <Block>
                <Block>
                <Image style={{ height: 300, width: 350 }} source={{ uri: viewItem.fromUserPicture }} />
                </Block>
            </Block>  
          </View>
          </View>
      </Modal>
      {/* Found Child Modal */}
      <Modal
            animationType="slide"
            transparent={true}
            visible={foundModal}
            onRequestClose={() => {
              setFoundModal(false);
            }}
            >     
          <View style={styles.picModalStyle}>
          <View style={styles.picModalView}>
            <Block row bottom>
            <TouchableOpacity onPress={()=>setFoundModal(!foundModal)}>
              <Icon name="closecircleo" family="AntDesign" size={30} color="maroon" style={{marginRight:10,marginBottom:10}}/>
              </TouchableOpacity>
            </Block>
            <Block middle>
                <Block>
                <Image style={{ height: 300, width: 350, marginBottom:10 }} source={{ uri: viewItem.childPicture }} />
                </Block>
                <Text size={20}>{viewItem.note}</Text>
                <TouchableOpacity onPress={()=>callParent(viewItem.fromUserContact)}>
                  <Text size={20} color="white" style={{backgroundColor:"rgba(128,0,0,0.8)",paddingTop:15,paddingBottom:15,paddingRight:20,paddingLeft:20, margin:10}}>Call Parent</Text>
                </TouchableOpacity>
            </Block>  
          </View>
          </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "openSans",
    marginTop: Constants.statusBarHeight,
    justifyContent:"flex-start",
    alignItems:"center"
  },
  container: {
    flex:1,
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#e8e8e8",
  },
  modalStyle:{
        display:"flex",
        justifyContent: "center",
        margin:50,
        borderWidth:1,
        borderColor:"maroon",
  },
  modalView: {
    //margin: 30,
    backgroundColor: "white",
    padding: 20,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  picModalStyle:{
    flex: 1,
    justifyContent: "center",
},
  picModalView: {
    //margin:50,
    backgroundColor: "white",
    padding: 10,
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
