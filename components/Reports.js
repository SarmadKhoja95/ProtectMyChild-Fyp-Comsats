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
//redux state
import { useSelector, useDispatch } from 'react-redux';
import { getReports } from "../api/report/reportAction";

import cityIcon from "../assets/city.png";
import ageIcon from "../assets/age.png";
import genderIcon from "../assets/gender.png";
import infoIcon from "../assets/info.png";
import dressIcon from "../assets/shirt.png";


function EmptyList() {
    return (
      <Block flex middle style={{ paddingTop: 20 }}>
        <Text h5>No reports available</Text>
      </Block>
    );
  }
  
  function Item(props) {
  
    return (
      <Block flex={1} row style={styles.item}>
        <Block flex={0.2} center>
        <TouchableOpacity onPress={()=>props.viewPicture(props.item)}>
        <Image style={{ height: 70, width: 70 }} source={{ uri: props.item.profilePicture}} />
        </TouchableOpacity>
        </Block>
        <Block flex={0.4}top style={{paddingLeft:15}}>
        <Text size={18} bold>{props.item.name}</Text>
        <Block row>
        <Text size={15}>Age: </Text>
        <Text size={15} color="grey">{props.item.age}</Text>
        </Block>
        <Block row>
        <Text size={15}>City: </Text>
        <Text size={15} color="grey">{props.item.city}</Text>
        </Block>
        </Block>
        <Block flex={0.3} middle>
          <Text size={15}>{moment(props.item.createdAt).format("MMM Do YY")}</Text>
          <Text size={15}>{moment(props.item.createdAt).format("LT")}</Text>
        </Block>
        <Block flex={0.15} middle>
        <TouchableOpacity onPress={()=> props.viewDetail(props.item)}>
          <Icon name="eye" family="Entypo" color="black" size={25} style={{ padding: 3 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.viewLocation(props.item)}>
          <Icon name="location" color="#BF0A30" family="Entypo" size={25} style={{ padding: 3 }} />
        </TouchableOpacity>
        </Block>
      </Block>
    );
  }  

export default function Reports( props ) {

const [modalVisible, setModalVisible] = useState(false);
const [picModal, setPicModal] = useState(false);
const [viewItem, setItem] = useState({});
const [viewItemLocation, setItemLocation] = useState({ longitude: null, latitude: null });
const dispatch = useDispatch();
//redux state user
// const user = useSelector(state => state.auth);
// const report = useSelector(state => state.report.data.data);
// const isGetLoading = useSelector(state => state.isLoading.GET_USER_REPORTS);

// useEffect(() => { dispatch(getReports(user.data.token)); }, []);

const viewLocation = (item) => {
    props.navigation.navigate("ReportLocation", { location: item.location });
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
          <Text h3 color="maroon">Open Reports</Text>
          <Icon name="minus" family="AntDesign" size={70} color="maroon" style={{margin:-15}}/>
          </Block>
        <FlatList
          data={props.route.params.reports.result}
          ListEmptyComponent={<EmptyList />}
          renderItem={({ item }) => <Item item={item} viewLocation={viewLocation} viewDetail={viewDetail} viewPicture={viewPicture} />}
          keyExtractor={item => item.id}
        />
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
            <Block row bottom>
            <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
              <Icon name="closecircleo" family="AntDesign" size={30}/>
              </TouchableOpacity>
            </Block>
            <Block row>
                <Block flex={0.3}>
                <Image style={{ zIndex: 2, height: 80, width: 80, borderRadius: 40 }} source={{ uri: viewItem.profilePicture }} />
                </Block>
                <Block flex={0.8} style={{marginLeft:15,paddingLeft:15}}>
                <Text size={30} bold>{viewItem.name}</Text>
                <Block row> 
                <Block flex={0.5}>
                <Text size={15} color="grey">Longitude:</Text>
                <Text size={15} color="grey">Latitude:</Text>
                <Text size={15} color="grey">Accuracy:</Text>
                <Text size={15} color="grey">Last update:</Text>
                </Block>
                <Block flex={0.5}>
                <Text size={15} color="grey">{viewItemLocation.longitude || null}</Text>
                <Text size={15} color="grey">{viewItemLocation.latitude || null}</Text>
                <Text size={15} color="grey">775m LBS</Text>
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
                  <Text size={18}>Male</Text>
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
                  <Text size={15}>Serious matterlksdkjdslkfjdsokfnsdlknckshrrifnsdlsknvferoijlknsfknvor vroijvoidrjvoijriov oj </Text>
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
          <View style={styles.modalStyle}>
          <View style={styles.picModalView}>
            <Block row bottom>
            <TouchableOpacity onPress={()=>setPicModal(!picModal)}>
              <Icon name="closecircleo" family="AntDesign" size={30} color="maroon" style={{marginRight:10,marginBottom:10}}/>
              </TouchableOpacity>
            </Block>
            <Block>
                <Block>
                <Image style={{ height: 300, width: 300 }} source={{ uri: viewItem.profilePicture }} />
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
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
  item: {
    //backgroundColor: '#e8e8e8',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    //justifyContent:"center",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#e8e8e8"
  },
  modalStyle:{
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        //marginTop: 22
  },
  modalView: {
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
    //elevation: 15,
    
  },
  picModalView: {
    margin:50,
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
    //elevation: 15,
    
  },
});
