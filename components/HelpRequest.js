import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity, StatusBar, FlatList, Modal
  
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


function EmptyList() {
    return (
      <Block flex middle style={{ paddingTop: 20 }}>
        <Text h5>No help requests found !</Text>
      </Block>
    );
  }
  
  function Item(props) {
  
    return (
      <Block style={styles.item}>
      <Block flex={1} row>
        {/* <Block flex={0.2} center>
        <TouchableOpacity>
        <Image style={{ height: 70, width: 70 }} source={{ uri: props.item.profilePicture}} />
        </TouchableOpacity>
        </Block> */}
        <Block flex={0.4}top style={{paddingLeft:15}}>
        <Text size={18} bold>Name</Text>
        </Block>
        <Block flex={0.3} top>
          {/* <Text size={15}>{moment(props.item.createdAt).format("MMM Do YY")}</Text>
          <Text size={15}>{moment(props.item.createdAt).format("LT")}</Text> */}
         <Block row>
        <Text size={15}>City: </Text>
        <Text size={15} color="grey">City</Text>
        </Block>
        <Block row>
        <Text size={15}>Contact: </Text>
        <Text size={15} color="grey">0000</Text>
        </Block>
        </Block>
        <Block row flex={0.15} middle>
        <TouchableOpacity>
          <Icon name="done" family="MaterialIcons" color="green" size={25} style={{ padding: 3 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="cross" color="#BF0A30" family="Entypo" size={25} style={{ padding: 3 }} />
        </TouchableOpacity>
        </Block>
        {/* <Block flex={0.15} middle>
        <TouchableOpacity>
          <Icon name="eye" family="Entypo" color="black" size={25} style={{ padding: 3 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="location" color="#BF0A30" family="Entypo" size={25} style={{ padding: 3 }} />
        </TouchableOpacity>
        </Block> */}
      </Block>
      {/* <Block middle style={{width:"40%",padding:5,borderWidth:0.7,borderColor:"rgb(185,0,0)"}}>
        <Text size={15}>1 Help Request</Text>
      </Block> */}
      </Block>
    );
  }  

export default function HelpRequest( props ) {

const [modalVisible, setModalVisible] = useState(false);
const [picModal, setPicModal] = useState(false);
const [viewItem, setItem] = useState({});
const [viewItemLocation, setItemLocation] = useState({ longitude: null, latitude: null });
//const [result, setResult] = useState(props.route.params.reports.result);

const openPCP = () => {
  Linking.openURL(`https://play.google.com/store/apps/details?id=com.govpk.citizensportal`);
}

const openNearbyStation = (longitude,latitude) => {
  if( latitude != null && longitude != null){
    Linking.openURL(`https://www.google.com/maps/search/police+station/@${latitude},${longitude},12z`);
  }
}

const viewLocation = (item) => {
    props.navigation.navigate("ReportLocation", { location: item.location , radius : item.radius });
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

  return (
      <View style={styles.container}>
          <Block middle style={{padding:10,paddingBottom:0}}>
          <Text h3 color="maroon">Help Requests</Text>
          <Icon name="minus" family="AntDesign" size={70} color="maroon" style={{margin:-15}}/>
          </Block>
        <FlatList
          data={[1,2,3]}
          ListEmptyComponent={<EmptyList />}
          renderItem={({ item }) => <Item item={item} viewLocation={viewLocation} viewDetail={viewDetail} viewPicture={viewPicture} />}
          keyExtractor={item => item.id}
        />
        <Modal
            animationType="slide"
            presentationStyle="fullScreen"
            //transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
              >     
          <View style={styles.modalStyle}>
          <View style={styles.modalView}>
            <Block row top style={{paddingBottom:20}}>
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
            <Block middle>
              <Text size={16} color="grey" style={{ paddingVertical: 15 }}>You can report to concerned authorities</Text>
              <Block style={{ paddingBottom: 15 }}>
                <TouchableOpacity onPress={openPCP}><Text color="maroon" size={18} style={{backgroundColor:"maroon",color:"white",paddingHorizontal:25,paddingVertical:10}}>Pak-Citizen Portal</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>openNearbyStation(viewItemLocation.longitude,viewItemLocation.latitude)}><Text color="maroon" size={18} style={{backgroundColor:"maroon",color:"white",paddingHorizontal:25,paddingVertical:10,marginTop:5}}>Nearby Police Station</Text></TouchableOpacity>
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
                <Image style={{ height: 300, width: 350 }} source={{ uri: viewItem.profilePicture }} />
                </Block>
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
        flex: 1,
        //justifyContent: "center",
  },
  modalView: {
    //margin: 50,
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
