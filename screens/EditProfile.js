import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { Block, Text, Button, Icon, Input } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import { isEmpty } from "lodash";
import Constants from "expo-constants";



//redux state
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from "../api/auth/authAction";

export default function EditProfile(props) {
  const [name, onChangeName] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const [city, onChangeCity] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  let [selectedImage, setSelectedImage] = React.useState(null);


  //redux state user
  const user = useSelector(state => state.auth);
  const isLoading = useSelector(state => state.isLoading.UPDATE_USER);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(user.data)) {
      setAvatar(user.data.user.profilePicture);
    }
  }, [user.data]);

  useEffect(() => {
    if (user.isUpdate) {
      props.navigation.goBack();
    }
  }, [user.isUpdate]);


  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }
    );
    if (pickerResult.cancelled === true) {
      return;
    }
    setAvatar(pickerResult.uri);
  };

  const updateUserData = async () => {
    let isNew = false;
    if (avatar !== user.data.user.profilePicture) {
      isNew = true;
    }
    dispatch(updateUser(user.data.token, isNew, name, phone, city, avatar, user.data));
  };
  console.log(avatar);
  return (
    <Block flex middle style={styles.container}>
      <ScrollView>
        <Block flex={0.3} middle>
          <TouchableOpacity onPress={openImagePickerAsync} style={{ paddingTop: 30 }}>
            <Block bottom height={150} width={150} style={{ backgroundColor: "#555", borderColor: "#bdbfbf", borderWidth: 0.5 }}>
              <Image
                source={{ uri: avatar || null }}
                style={styles.thumbnail}
              />
            </Block>
          </TouchableOpacity>

        </Block>
        <Block flex={0.7} middle style={{ paddingTop: 20 }}>

          <Input placeholder="Name" bgColor="" va borderless style={{ width: 350, height: 60, borderBottomWidth: 0.5, borderColor: "black" }} onChangeText={text => onChangeName(text)} value={name} />
          <Input placeholder="Phone" bgColor="" borderless style={{ width: 350, height: 60, borderBottomWidth: 0.5, borderColor: "black" }} onChangeText={text => onChangePhone(text)} value={phone} />
          <Input placeholder="City" bgColor="" borderless style={{ width: 350, height: 60, borderBottomWidth: 0.5, borderColor: "black" }} onChangeText={text => onChangeCity(text)} value={city} />
          {/* <Button color="" shadowless style={{margin:10,borderWidth:1}}><Text size={15}>CHANGE PASSWORD</Text></Button> */}
          <Button color="#BF0A30" shadowless style={{ margin: 10 }}
            loading={isLoading}
            onPress={updateUserData}
          >Update</Button>
        </Block>
      </ScrollView>
    </Block>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
  thumbnail: {
    width: 150,
    height: 150,
    resizeMode: "cover"
  }
});
