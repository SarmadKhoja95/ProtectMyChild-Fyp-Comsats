import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Switch, ScrollView,
  Picker, ActionSheetIOS, Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard,
  BackHandler,
  PanResponder,
  Image
} from "react-native";
import Constants from "expo-constants";
import { Icon, Block, Text, Input, Button, } from 'galio-framework';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//redux state
import { useSelector, useDispatch } from 'react-redux';
import { addReport } from "../api/report/reportAction";
import { create } from "../app-backend/models/report";

export default function CitizenReporting(props) {
  const [Name, onChangeName] = React.useState('');
  const [Age, onChangeAge] = React.useState('');
  const [Dress, onChangeDress] = React.useState('');
  const [Gender, onChangeGender] = React.useState('');
  const [City, onChangeCity] = React.useState('');
  const [addInfo, onChangeInfo] = React.useState('');
  //redux state user
  const user = useSelector(state => state.auth);
  const report = useSelector(state => state.report);
  const isLoading = useSelector(state => state.isLoading.ADD_USER_REPORTS);
  const dispatch = useDispatch();

  useEffect(() => {
    if (report.isAdd) {
      props.navigation.goBack();
    }
  }, [report.isAdd]);

  const saveReport = () => {
    let profilePicture = "https://randomuser.me/api/portraits/men/40.jpg";
    let location = {latitude: 33.489608,longitude: 73.0850208}
    dispatch(addReport(Name, Age, profilePicture, City, location, Dress , user.data.token));

  }

  return (
      <KeyboardAwareScrollView >
      <Block style={styles.container}>
        <Block flex={0.4}>
          <Block center container flex={0.4} style={styles.headerContainer}>
            <Text h4 color="black" >Lost Child's Information</Text>
            <Image source={require("../assets/default.png")} style={styles.defImage} />
          </Block>
          <Block item container center flex={0.6} style={{ paddingLeft: 10, paddingRight: 10}} >
            <Input
              style={styles.textArea}
              placeholder="Name"
              placeholderTextColor="grey"
              maxLength={150}
              onChangeText={text => onChangeName(text)} value={Name}
            />
            <Input
              type="phone-pad"
              style={styles.textArea}
              placeholder="Age"
              placeholderTextColor="grey"
              maxLength={150}
              onChangeText={text => onChangeAge(text)} value={Age}
            />
            <Input
              style={styles.textArea}
              placeholder="Dress Color (Wearing)"
              placeholderTextColor="grey"
              maxLength={150}
              onChangeText={text => onChangeDress(text)} value={Dress}
            />
            <Input
              style={styles.textArea}
              placeholder="Gender"
              placeholderTextColor="grey"
              maxLength={150}
              onChangeText={text => onChangeGender(text)} value={Gender}
            />
            <Input
              style={styles.textArea}
              placeholder="City (Last seen)"
              placeholderTextColor="grey"
              maxLength={150}
              onChangeText={text => onChangeCity(text)} value={City}
            />
            <Input
              style={styles.textAreaInfo}
              placeholder="Additional info (optional)"
              placeholderTextColor="grey"
              maxLength={150}
              onChangeText={text => onChangeInfo(text)} value={addInfo}
            />
          </Block>
        </Block>
        <Block flex={0.6} container>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Block style={{ paddingVertical: 15, paddingHorizontal:15}}>
              <Text h5 style={{paddingVertical:15}}>Report to:</Text>
              <Block space="around" row style={{paddingBottom:15}}>
              <TouchableOpacity><Text color="maroon" size={18}>PAK-CITIZEN PORTAL</Text></TouchableOpacity>
              <TouchableOpacity><Text color="maroon" size={18}>POLICE STATION</Text></TouchableOpacity>
              </Block>
              <Button onPress={()=>props.navigation.navigate("AddLocation")} uppercase color="maroon" style={styles.iconBtn}><Icon color="white" name="location-on" family="Materialicons" size={25} style={{padding:8}}/><Text color="white" size={17}>Add Location</Text></Button>
              <Button uppercase color="maroon" onPress={saveReport} loading={isLoading}>Submit</Button>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "openSans",
  },
  textArea: {
    padding: 0,
    height: 70,
    width:"80%",
    borderRadius: 0,
    borderWidth:0,
    borderBottomWidth: 1,
    backgroundColor:"#F5F5F5"
  },
  textAreaInfo:{
    padding: 0,
    height: 120,
    width:"80%",
    borderRadius: 0,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    //paddingVertical: 0
  },
  blockSpaceContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: "center",
    paddingVertical: 15,
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    justifyContent: "space-around"

  },
  iconBtn:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "center",
    marginVertical:8   
  },
  picker: {
    width: "100%",
    height: 40,
    borderColor: 'blue',
    borderWidth: 1
  },
  pickerItem: {
    height: 44,
    color: 'red'
  },
  defImage:{
    marginVertical:15,
    height:100,
    width:130,
    resizeMode:"cover"
  }
});
