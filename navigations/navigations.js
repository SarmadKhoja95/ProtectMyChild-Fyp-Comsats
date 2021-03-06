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
import AddChild from "../screens/AddChild";
import AddChildLocation from "../screens/AddChildLocation";
import AddChildSafeZones from "../screens/AddChildSafeZones";
import ChildSafeZone from "../components/ChildSafeZone";
import HelpingOthers from "../screens/HelpOthers";
import Analytics from "../screens/Analytics";
import SelectReports from "../screens/SelectReports";
import CitizenReporting from "../screens/CitizenReporting";
import AddLocation from "../screens/AddLocation";
import ChildProfile from "../screens//ChildProfile";
import LocationHistory from "../screens/LocationHistory";
import Reports from "../components/Reports";
import ReportLocation from "../components/ReportLocation";
import HelpRequest from "../components/HelpRequest";
import UserProfile from "../screens/UserProfile";
import EditProfile from "../screens/EditProfile";



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
      <Stack.Navigator headerMode="none" initialRouteName="SelectReports">
        <Stack.Screen name="SelectReports" component={SelectReports} />
        <Stack.Screen name="AddReport" component={CitizenReporting} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="ReportLocation" component={ReportLocation} />
        <Stack.Screen name="AddLocation" component={AddLocation} />
        <Stack.Screen name="HelpRequest" component={HelpRequest} />
      </Stack.Navigator>
    );
  }

  const UserDashboardStack = createStackNavigator();
 
  function UserDashboardStackScreen() {
    return (
      <UserDashboardStack.Navigator initialRouteName="DashboardHome" headerMode="none">
        <UserDashboardStack.Screen name="DashboardHome" component={DashboardHome} />
        <UserDashboardStack.Screen name="ChildProfile" component={ChildProfile} />
        <UserDashboardStack.Screen name="LocationHistory" component={LocationHistory} />
        <UserDashboardStack.Screen name="UserProfile" component={UserProfile} />
        <UserDashboardStack.Screen name="EditProfile" component={EditProfile} />
        <UserDashboardStack.Screen name="AddChild" component={AddChild} />
        <UserDashboardStack.Screen name="AddChildLocation" component={AddChildLocation} />
        <UserDashboardStack.Screen name="AddChildSafeZones" component={AddChildSafeZones} />
        <UserDashboardStack.Screen name="ChildSafeZone" component={ChildSafeZone} />
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
              iconName = "child-care";
              iconFamily = "MaterialIcons";
            } else if (route.name === 'HelpingOthers') {
              iconName = "slideshare";
              iconFamily = "Entypo";
            }
            else if (route.name === "Report") {
              iconName = "dashboard";
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
          activeTintColor: "maroon",
          //style:{height:50,borderTopWidth:0.5}
        }}
      >
        <Tab.Screen name="UserDashboard" options={{ tabBarLabel: "Kids" }} component={UserDashboardStackScreen} />
        <Tab.Screen name="Report" options={{ tabBarLabel: "Dashboard" }} component={CitizenReportingNavigations} />
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
  if (user.isAuthenticated) {
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
          <Stack.Navigator style={{ fontFamily: "openSans" }} headerMode="none" initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
