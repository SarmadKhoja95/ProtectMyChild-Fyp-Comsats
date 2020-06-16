import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  
} from "react-native";
import { Block, Text, Button, Icon } from 'galio-framework';
import pic from "../assets/report.png"

import Constants from "expo-constants";

export default function SelectReports( props ) {
  

  return (
    <Block style={styles.container}>
      <Block flex={0.2} style={{ width:"100%",justifyContent:"flex-start",alignItems:"center",paddingTop:15}}>
        <Block middle height={150} width={150} >
          <Image
            style={{ height: 100, width: 100 }}
            source={pic}
          />
          <Block middle>
              <Text h5 bold color="grey">Complaints</Text>
          </Block>
        </Block>
      </Block>
      <Block flex={0.5} style={{ width: "85%"}}>
        <Block space="between" style={{ height:"35%", width:"100%",padding:15,backgroundColor:"#74BBFB" }}>
          <Text size={45} color="white" >0</Text>
          <Block><Text size={22} color="white">Total complaints</Text></Block>
        </Block>
        <Block row space="between" style={{ height:"35%", marginTop:"3%", width:"100%" }}>
          <Block style={{backgroundColor:"#e43a39",width:"48%",padding:15}}>
          <Text size={35} color="white" >0</Text>
          <Block><Text size={20} color="white">Open Complaints</Text></Block>
          </Block>
          <Block style={{backgroundColor:"#50C878",width:"48%",padding:15}}>
          <Text size={35} color="white" >0</Text>
          <Block><Text size={20} color="white">Closed Complaints</Text></Block>
          </Block>
        </Block>
      </Block>
      <Block flex={0.25} bottom style={{ width:"100%"}}>
      <Button onPress={()=>props.navigation.navigate("AddReport")} onlyIcon icon="plus" iconFamily="Feather" iconSize={30} iconColor="white" size="small" color="maroon" style={{ position:"absolute",bottom:0,right:25, width:60,height:60 }} />
      </Block>
    </Block >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "openSans",
    marginTop: Constants.statusBarHeight,
    justifyContent:"flex-start",
    alignItems:"center"
  },
});
