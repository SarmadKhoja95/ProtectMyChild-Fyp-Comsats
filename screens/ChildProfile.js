import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  
} from "react-native";
import { Block, Text, Button, Icon } from 'galio-framework';

import Constants from "expo-constants";

export default function ChildProfile({ navigation }) {
  

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
              <Text h4>John</Text>
          </Block>
        </Block>
      </Block>
      <Block flex={0.6} style={{ width: "90%", padding:15, backgroundColor:"", borderWidth:0.5, borderColor:"grey"}}>
        <Block flex={0.15} row space="between" style={{ width:"100%" }}>
          <Block>
              <Text size={20} bold>Last Location</Text>
              <Text size={15}>Jan 15 2020 - 02:45 PM</Text>
            </Block>
          <Block>
              <Text size={15}>30 mins ago</Text>
            </Block>
        </Block>
        <Block flex={0.2} row space="between" style={{ width:"100%", alignItems:"center"}}>
            <Block row middle>
            <Icon name="target" family="Feather" size={26} style={{paddingRight:10}}/>
            <Block>
              <Text size={18} bold>Accuracy</Text>
              <Text size={14}>55 meters</Text>
            </Block>
            </Block>
            <Block row middle>
            <Icon name="direction" family="Entypo" size={26} style={{marginRight:10}}/>
            <Block>
              <Text size={18} bold>Accuracy</Text>
              <Text size={14}>55 meters</Text>
            </Block>
            </Block>
        </Block>
        <Block flex={0.2} row space="between" style={{ width:"100%", alignItems:"center"}}>
            <Block row middle>
            <Icon name="map-pin" family="Feather" size={26} style={{paddingRight:10}}/>
            <Block>
              <Text size={18} bold>Latitude</Text>
              <Text size={14}>55.23453</Text>
            </Block>
            </Block>
            <Block row middle>
            <Icon name="map-pin" family="Feather" size={26} style={{paddingRight:10}}/>
            <Block>
              <Text size={18} bold>Longitude</Text>
              <Text size={14}>78.23453</Text>
            </Block>
            </Block>
        </Block>
      </Block>
      <Block flex={0.15} middle>
      <Button size="small" color="maroon" shadowless style={{ borderWidth: 1, marginTop: 2 }}><Text size={18} color="white">Remove</Text></Button>
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
