import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Block, Text, Icon, Input, Button } from "galio-framework";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import Constants from "expo-constants";

export default function AddChild(props) {
  console.log("djdd");
  const [Name, onChangeName] = useState('');
  const [Contact, onChangeContact] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);


  const addLocationNavigate = () => {
    if (Name != "" && Contact != "" && selectedImage != null) {
      let childData = { name: Name, contact: Contact, picture: selectedImage.localUri };
      props.navigation.navigate("AddChildLocation", { childData });
    }
  };

  const openImagePickerAsync = async () => {
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
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <KeyboardAwareScrollView>
      <Block style={styles.container}>
        <Block flex={0.4}>
          <Block center container flex={0.4} style={styles.headerContainer}>
            <Text h4 color="black" style={{marginVertical:15}}>Add New Child</Text>
            {/* <Image source={require("../assets/default.png")} style={styles.defImage} /> */}
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
              {selectedImage ?
                <Block middle height={150} width={150} style={{ borderColor: "#bdbfbf", borderWidth: 0.5 }}>
                  <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                  />
                </Block> :
                <Block middle height={150} width={150} style={{ backgroundColor: "#bdbfbf", borderWidth: 0.5 }}>
                  <Icon name="user" family="AntDesign" size={30} />
                </Block>
              }
            </TouchableOpacity>
          </Block>
          <Block item container center flex={0.6} style={{ paddingLeft: 10, paddingRight: 10 }} >
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
              placeholder="Contact"
              placeholderTextColor="grey"
              maxLength={150}
              onChangeText={text => onChangeContact(text)} value={Contact}
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
  );
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
    width: 150,
    height: 150,
    resizeMode: "cover"
  }
});
