import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  
} from "react-native";
import { Block, Text, Button, Icon } from 'galio-framework';
import Constants from "expo-constants";
import moment from "moment";

export default function ChildProfile(props) {
  
  return (
    <Block style={styles.container}>
      <Block flex={0.3} style={{ width:"100%",justifyContent:"flex-start",alignItems:"center",paddingTop:15}}>
        <Block height={150} width={150} style={{ backgroundColor: "#bdbfbf", borderWidth: 0.5 }}>
          <Image
            style={{ height: 150, width: 150 }}
            source={{
              uri: props.route.params.child.picture
            }}
          />
          <Block middle>
              <Text h4>{props.route.params.child.name}</Text>
          </Block>
        </Block>
      </Block>
      <Block flex={0.6} style={{ width: "90%", padding:15, backgroundColor:"", borderWidth:0.5, borderColor:"grey"}}>
        <Block flex={0.15} row space="between" style={{ width:"100%" }}>
          <Block>
              <Text size={20} bold>Last Location</Text>
              <Text size={15}>{moment(props.route.params.child.position.time).format('lll')}</Text>
            </Block>
          <Block>
              <Text size={15}>{moment(props.route.params.child.position.time).fromNow()}</Text>
            </Block>
        </Block>
        <Block flex={0.2} row space="between" style={{ width:"100%", alignItems:"center"}}>
            <Block row middle>
            <Icon name="map-pin" family="Feather" size={26} style={{paddingRight:10}}/>
            <Block>
              <Text size={18} bold>Latitude</Text>
              <Text size={14}>{props.route.params.child.position.latitude}</Text>
            </Block>
            </Block>
            <Block row middle>
            <Icon name="map-pin" family="Feather" size={26} style={{paddingRight:10}}/>
            <Block>
              <Text size={18} bold>Longitude</Text>
              <Text size={14}>{props.route.params.child.position.longitude}</Text>
            </Block>
            </Block>
        </Block>
        <Block flex={0.2} row space="between" style={{ width:"100%", alignItems:"center"}}>
            <Block row middle>
            <Icon name="contacts" family="AntDesign" size={26} style={{paddingRight:10}}/>
            <Block>
              <Text size={18} bold>Contact No</Text>
              <Text size={14}>{props.route.params.child.contact}</Text>
            </Block>
            </Block>
            <Block row middle>
            <Icon name="user" family="Feather" size={26} style={{marginRight:10}}/>
            <Block style={{width:"45%"}}>
              <Text size={18} bold>Parent</Text>
              <Text size={14}>{props.route.params.parent}</Text>
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
