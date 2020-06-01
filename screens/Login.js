import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions
} from "react-native";
import { Icon, Block, Text, Input, Button, Checkbox } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//redux state
import { useSelector, useDispatch } from 'react-redux';
import { userLogin, resetUser } from "../api/auth/authAction";


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(false);

  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  const user = useSelector(state => state.auth);
  const isLoading = useSelector(state => state.isLoading.GET_USER);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUser());
  }, []);

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });


  const login = () => {
    if (email != "" && password != "") {
      dispatch(userLogin(email, password));
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <LinearGradient colors={['maroon', 'white']} style={{ flex: 1, height: dimensions.window.height }}>
        <Block style={styles.container}>
          <Block flex={0.3} style={styles.createAccountContainer}>
            <Text h3 bold color="white" >Login</Text>
          </Block>
          <View style={{ flex: 0.5, alignItems: "center", }}>
            <Block flex={0.6} style={{ alignItems: "center" }}>
              <Input onChangeText={text => setEmail(text)} placeholder="Email" borderless style={styles.input} />
              <Input onChangeText={text => setPassword(text)} placeholder="Password " borderless style={styles.input} />
              {user.msg !== "" ?
                <Block style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><Text color="#fff" style={{ width: "100%", textAlign: "center" }}>* {user.msg}</Text></Block>
                : null}
            </Block>
            <Block center flex={0.6}>
              <Button loading={isLoading} onPress={() => login()} style={{ width: 280 }} uppercase color="maroon">Login</Button>
            </Block>
          </View>
        </Block>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "openSans",
  },
  createAccountContainer: {
    flexDirection: "row",
    paddingBottom: "7%",
    justifyContent: "center",
    alignItems: "flex-end",
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
    alignSelf: "center",
    width: 280
  }

});