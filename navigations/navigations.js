import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import Constants from 'expo-constants';


//Galio Framework Imports
import { Icon } from 'galio-framework';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Auth Screens
import Login from "../screens/Login";
import SignupScreen from "../screens/Signup";


import DashboardHome from "../screens/DashboardHome";
import HelpingOthers from "../screens/HelpOthers";
import Analytics from "../screens/Analytics";
import CitizenReporting from "../screens/CitizenReporting";
import AddLocation from "../screens/AddLocation";


//redux state
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from "../api/auth/authAction";


export default function Navigation(props) {
  const [assetsLoading, setAssetsLoading] = useState(true);

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  //redux state user
  const user = useSelector(state => state.auth);
  const isLoading = useSelector(state => state.isLoading.LOAD_USER);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadUser());
  }, []);


  //Loading Fonts
  _cacheResourcesAsync = async () => {
    await Font.loadAsync({
      openSans: require("../assets/fonts/OpenSans-Regular.ttf"),
    });
  };


  //Citizen Reporting navs Using Stack Navigator
  const CitizenReportingNavigations = (props) => {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="AddReport">
        <Stack.Screen name="AddReport" component={CitizenReporting} />
        <Stack.Screen name="AddLocation" component={AddLocation} />
      </Stack.Navigator>
    );
  }

  const UserDashboardStack = createStackNavigator();
 
  function UserDashboardStackScreen() {
    return (
      <UserDashboardStack.Navigator initialRouteName="DashboardHome" headerMode="none">
        <UserDashboardStack.Screen name="DashboardHome" component={DashboardHome} />
      </UserDashboardStack.Navigator>
    );
  }


  const DashboardNavigations = (props) => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconFamily;
            if (route.name === 'UserDashboard') {
              iconName = "home";
              iconFamily = "MaterialIcons";
            } else if (route.name === 'HelpingOthers') {
              iconName = "slideshare";
              iconFamily = "Entypo";
            }
            else if (route.name === "Report") {
              iconName = "warning";
              iconFamily = "AntDesign";
            }
            else if (route.name === "Analytics") {
              iconName = "assessment";
              iconFamily = "MaterialIcons";
            }
            return <Icon name={iconName} family={iconFamily} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "maroon"
        }}
      >
        <Tab.Screen name="UserDashboard" options={{ tabBarLabel: "Dashboard" }} component={UserDashboardStackScreen} />
        <Tab.Screen name="Report" options={{ tabBarLabel: "Report" }} component={CitizenReportingNavigations} />
        <Tab.Screen name="HelpingOthers" options={{ tabBarLabel: "Help" }} component={HelpingOthers} />
        <Tab.Screen name="Analytics" options={{ tabBarLabel: "Analytics" }} component={Analytics} />
      </Tab.Navigator>
    );
  }

  //Loading Assets
  //Loading Assets
  if (assetsLoading || user.loadUser) {
    return (
      <>
        <AppLoading
          startAsync={_cacheResourcesAsync}
          onFinish={() => setAssetsLoading(false)}
          onError={console.warn}
        />
      </>
    );
  }
  // user.isAuthenticated
  if (true) {
    return (
      <View style={{ flex: 1, backgroundColor: "pink", fontFamily: "openSans" }}>
        <NavigationContainer>
          {DashboardNavigations()}
        </NavigationContainer>
      </View>
    );
  }
  else {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", fontFamily: "openSans" }}>
        <NavigationContainer>
          <Stack.Navigator style={{ fontFamily: "openSans" }} headerMode="none" initialRouteName="Signup">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
