import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  
} from "react-native";
import { Block, Text, Button, Icon } from 'galio-framework';

import Constants from "expo-constants";

export default function SelectReports({ navigation }) {
  

  return (
    <Block style={styles.container}>
      <Block flex={0.3} style={{ width:"100%",justifyContent:"flex-start",alignItems:"center",paddingTop:15}}>
        <Block height={150} width={150} style={{ backgroundColor: "#bdbfbf", borderWidth: 0.5 }}>
          <Image
            style={{ height: 150, width: 150 }}
            source={{
              uri: "https://randomuser.me/api/portraits/men/1.jpg"
            }}
          />
          <Block middle>
              <Text h4>Reports</Text>
          </Block>
        </Block>
      </Block>
      <Block flex={0.6} style={{ width: "85%", padding:15, backgroundColor:"", borderWidth:0.5, borderColor:"grey"}}>
        <Block row space="between" style={{ height:"50%", width:"100%",backgroundColor:"lightblue" }}>
        </Block>
      </Block>
      {/* <Block flex={0.15} middle>
      <Button size="small" color="maroon" shadowless style={{ borderWidth: 1, marginTop: 2 }}><Text size={18} color="white">Remove</Text></Button>
      </Block> */}
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
