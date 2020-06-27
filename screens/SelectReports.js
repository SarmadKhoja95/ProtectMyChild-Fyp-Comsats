import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity

} from "react-native";
import { Block, Text, Button, Icon } from 'galio-framework';
import pic from "../assets/report.png"
import Loading from "../components/Loading";
import Constants from "expo-constants";
import AwesomeAlert from 'react-native-awesome-alerts';
import { getReports } from "../api/report/reportAction";

//redux state
import { useSelector, useDispatch } from 'react-redux';
export default function SelectReports(props) {
  const [isAlert, setAlert] = useState(false);
  //redux state user
  const user = useSelector(state => state.auth);
  const report = useSelector(state => state.report.data);
  const isLoading = useSelector(state => state.isLoading.GET_USER_REPORTS);
  const dispatch = useDispatch();

 const showAlert = () => {
    setAlert(true);
  };
 
 const hideAlert = () => {
   setAlert(false);
  };

  useEffect(() => {
    if (props.route.params?.isReportAdd) {
      showAlert();
    }
  }, [props.route.params?.isReportAdd]);

  useEffect(() => {
    dispatch(getReports(user.data.token));
  }, []);

  return (
      <Block style={styles.container}>
        <Block flex={0.2} style={{ width: "100%", justifyContent: "flex-start", alignItems: "center", paddingTop: 15 }}>
          <Block middle height={150} width={150} >
            <Image
              style={{ height: 100, width: 100 }}
              source={pic}
            />
            <Block middle>
              <Text h5 bold color="grey">Complaints</Text>
            </Block>
          </Block>
        </Block>
        <Block flex={0.5} style={{ width: "85%" }}>
          <Block space="between" style={{ height: "35%", width: "100%", padding: 15, backgroundColor: "#74BBFB" }}>
            <Text size={45} color="white" >{report.data.total || 0} </Text>
            <Block><Text size={22} color="white">Total complaints</Text></Block>
          </Block>
          <Block row space="between" style={{ height: "35%", marginTop: "3%", width: "100%" }}>
            <Block style={{ backgroundColor: "#e43a39", width: "48%", padding: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.navigate("Reports", { reports: report.data })}>
                <Text size={35} color="white" >{report.data.active || 0}</Text>
                <Block><Text size={20} color="white">Open Complaints</Text></Block>
              </TouchableOpacity>
            </Block>
            <Block style={{ backgroundColor: "#50C878", width: "48%", padding: 15 }}>
              <Text size={35} color="white" >{report.data.closed || 0}</Text>
              <Block><Text size={20} color="white">Closed Complaints</Text></Block>
            </Block>
          </Block>
        </Block>
        <Block flex={0.25} bottom style={{ width: "100%" }}>
          <Button onPress={() => props.navigation.navigate("AddReport")} onlyIcon icon="plus" iconFamily="Feather" iconSize={30} iconColor="white" size="small" color="maroon" style={{ position: "absolute", bottom: 0, right: 25, width: 60, height: 60 }} />
        </Block>
        <AwesomeAlert
         show={isAlert}
         showProgress={false}
         title="Reports suggestion box"
         message="You must also report to concerned authorities like Pakistan-Citizen portal and Nearby Police station by navigating to Open-Reports > Eye-Icon"
         closeOnTouchOutside={true}
         closeOnHardwareBackPress={false}
         showCancelButton={true}
         showConfirmButton={true}
         cancelText="Cancel"
         confirmText="OK"
         titleStyle={{fontSize:22,fontWeight:"bold"}}
         messageStyle={{fontSize:18}}
         confirmButtonColor="#DD6B55"
         confirmButtonTextStyle={{fontSize:20,width:60}}
         cancelButtonTextStyle={{fontSize:20}}
         onCancelPressed={() => {
           hideAlert();
         }}
         onConfirmPressed={() => {
           hideAlert();
         }}
       />
        <Loading show={isLoading} />
      </Block >

    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "openSans",
    marginTop: Constants.statusBarHeight,
    justifyContent: "flex-start",
    alignItems: "center"
  },
});
