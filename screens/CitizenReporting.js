import React, { useState, useEffect } from "react";
import {
  StyleSheet, ScrollView, TouchableOpacity, Image
} from "react-native";
import Constants from "expo-constants";
import { Icon, Block, Text, Input, Button, } from 'galio-framework';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

//redux state
import { useSelector, useDispatch } from 'react-redux';

export default function CitizenReporting(props) {
  const [Name, onChangeName] = React.useState('');
  const [Age, onChangeAge] = React.useState('');
  const [Dress, onChangeDress] = React.useState('');
  const [Gender, onChangeGender] = React.useState('');
  const [City, onChangeCity] = React.useState('');
  const [addInfo, onChangeInfo] = React.useState('');
  let [selectedImage, setSelectedImage] = React.useState(null);

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
    });
    console.warn(pickerResult.uri);
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  const addLocationNavigate = () => {
    let profilePicture = selectedImage.localUri;
    let data = { Name, Age, profilePicture, City, Dress, Gender, addInfo };
    props.navigation.navigate("AddLocation", { data });
  }

  return (
    <KeyboardAwareScrollView >
      <Block style={styles.container}>
        <Block flex={0.4}>
          <Block center container flex={0.4} style={styles.headerContainer}>
            <Text h4 color="black" >Citizen Reporting</Text>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.imgBlock}>
              {selectedImage ?
                <Block middle height={150} width={300} style={{ borderColor: "#bdbfbf", borderWidth: 0.5 }}>
                  <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                  />
                </Block> :
                <Block middle height={150} width={300} style={{ backgroundColor: "rgba(178,34,34 , 0.8)", borderWidth: 0.5 }}>
                  <Icon name="image" family="Entypo" size={30} color="white"/>
                </Block>
              }
            </TouchableOpacity>
          </Block>
          <Block item container center flex={0.6} style={{ paddingLeft: 10, paddingRight: 10 }} >
          <Text size={17} color="black">Please fill the lost child's info</Text>
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
            <Block style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
              <Button onPress={addLocationNavigate} uppercase color="maroon" style={styles.iconBtn}><Icon color="white" name="location-on" family="Materialicons" size={25} style={{ padding: 8 }} /><Text color="white" size={17}>Add Location</Text></Button>
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
    width: "80%",
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    backgroundColor: "#F5F5F5"
  },
  textAreaInfo: {
    padding: 0,
    height: 120,
    width: "80%",
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
  imgBlock:{
    marginTop:15,
    marginBottom:15
  },
  iconBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8
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
  defImage: {
    marginVertical: 15,
    height: 100,
    width: 130,
    resizeMode: "cover"
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  }
});
