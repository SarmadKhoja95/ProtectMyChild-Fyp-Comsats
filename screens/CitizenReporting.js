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

export default function CitizenReporting(props) {
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
              //onChangeText={text => setText(text)}
              placeholderTextColor="grey"
              maxLength={150}
            />
            <Input
              type="phone-pad"
              style={styles.textArea}
              placeholder="Age"
              //onChangeText={text => setText(text)}
              placeholderTextColor="grey"
              maxLength={150}
            />
            <Input
              style={styles.textArea}
              placeholder="Dress Color (Wearing)"
              //onChangeText={text => setText(text)}
              placeholderTextColor="grey"
              maxLength={150}
            />
            <Input
              style={styles.textArea}
              placeholder="Gender"
              //onChangeText={text => setText(text)}
              placeholderTextColor="grey"
              maxLength={150}
            />
            <Input
              style={styles.textArea}
              placeholder="City (Last seen)"
              //onChangeText={text => setText(text)}
              placeholderTextColor="grey"
              maxLength={150}
            />
            <Input
              style={styles.textAreaInfo}
              placeholder="Additional info (optional)"
              //onChangeText={text => setText(text)}
              placeholderTextColor="grey"
              maxLength={150}
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
              <Button uppercase color="maroon">Submit</Button>
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
