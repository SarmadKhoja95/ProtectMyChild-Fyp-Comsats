import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  BackHandler
} from "react-native";
import { Icon, Block, Text, Input, Button } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { useSelector, useDispatch } from 'react-redux';
import { userSignup, resetUser } from "../api/auth/authAction";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


export default function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(state => state.auth);
  const isLoading = useSelector(state => state.isLoading.GET_USER);
  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window }) => {
    setDimensions(window);
  };


  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  const backLogin = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack();
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  const signup = () => {
    if (name != "" && password != "" && email !== "") {
      dispatch(userSignup(name, email, password));
    }
  };

  return (
    <KeyboardAwareScrollView>
      <LinearGradient colors={['maroon', 'white']} style={{ flex: 1, height: dimensions.window.height }}>
        <Block style={[styles.container]}>
          <Block flex={0.2} style={styles.createAccountContainer}>
            <Text h3 bold style={{ color: "white" }}>Signup</Text>
          </Block>
          <Block flex={0.4} style={{ marginTop: 40, }}>
            <Input onChangeText={name => setName(name)} placeholder="Name" borderless style={styles.input} />
            <Input onChangeText={email => setEmail(email)} placeholder="Email" borderless style={styles.input} />
            <Input onChangeText={password => setPassword(password)} placeholder="Password" borderless style={styles.input} />
            {user.msg !== "" ?
              <Block style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><Text color="#fff" style={{ width: "100%", textAlign: "center" }}>* {user.msg}</Text></Block>
              : null}
          </Block>
          <Block center flex={0.3} >
            <Button loading={isLoading} onPress={signup} style={{ width: 280, marginTop: 20 }} uppercase color="maroon">Signup</Button>
          </Block>
        </Block>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "openSans",
    // backgroundColor: "#f1c40f"
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 20,

  },
  socialIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 4
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  input: {
    width: "80%",
    alignSelf: "center"
  }

});