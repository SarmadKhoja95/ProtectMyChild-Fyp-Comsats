import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  AsyncStorage
} from "react-native";
import { Block, Text, Button } from 'galio-framework';

import Constants from "expo-constants";
//redux state
import { useSelector, useDispatch } from 'react-redux';

import { resetUser } from "../api/auth/authAction";

export default function UserProfile({ navigation }) {
  //redux state user
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  console.log(user);


  useEffect(() => {
    if (user.isUpdate) {
      dispatch(resetUpdateUser());
    }
  }, [user.isUpdate]);

  const userLogout = async () => {
    await AsyncStorage.removeItem("user");
    dispatch(resetUser());
  };
  return (
    <Block middle style={styles.container}>
      <Block flex={0.4} middle space="around">
        <Block middle height={150} width={150} style={{ backgroundColor: "#bdbfbf", borderWidth: 0.5 }}>
          <Image
            style={{ height: 150, width: 150 }}
            source={{
              uri: user.data.user.profilePicture,
            }}
          />
        </Block>
        <Button onPress={() => navigation.navigate('EditProfile')} size="small" color="white" shadowless style={{ borderWidth: 1, marginTop: 5 }}><Text size={18}>Edit Profile</Text></Button>
        <Button onPress={() => userLogout()} size="small" color="white" shadowless style={{ borderWidth: 1, marginTop: 5 }}><Text size={18}>Logout</Text></Button>
      </Block>
      <Block flex={0.5} style={{ width: "85%" }}>
        <Block flex={0.2} row style={{ alignItems: "center", justifyContent: "space-between" }}>
        <Text size={20} style={{ width: "35%" }}>Name :</Text>
        <Text muted size={15}>{user.data.user.name}</Text>
        </Block>
        <Block flex={0.2} row style={{
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Text size={20} style={{ width: "35%" }}>Email :</Text>
          <Text muted size={15}>{user.data.user.email}</Text>
        </Block>
        <Block flex={0.2} row style={{ alignItems: "center", justifyContent: "space-between" }}>
          <Text size={20} style={{ width: "35%" }}>Phone :</Text>
          <Text muted size={15}>{user.data.user.phone || "No Phone Provided"}</Text>
        </Block>
        <Block flex={0.2} row style={{ alignItems: "center", justifyContent: "space-between" }}>
          <Text size={20} style={{ width: "30%" }}>City :</Text>
          <Text muted size={15}>{user.data.user.city || "No City Provided"}</Text>
        </Block>
      </Block >
    </Block >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "openSans",
    marginTop: Constants.statusBarHeight
  },
});
