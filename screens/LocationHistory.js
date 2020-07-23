import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions, StatusBar, FlatList

} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Block, Text, Button, Icon } from 'galio-framework';
import locImg from "../assets/location.png";
import MapHistory from "./MapHistory";
import moment from "moment";
import Constants from "expo-constants";
import * as Location from 'expo-location';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    address: 'Usman Block Bahira Town',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    address: 'Near Saddar Rawalpindi',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    address: 'Gulraiz Colony',
  },
];

function EmptyList() {
  return (
    <Block flex middle style={{ paddingTop: 20 }}>
      <Text h5>No location history available</Text>
    </Block>
  );
}

const getAddress = async (location) => {
  let address = await Location.reverseGeocodeAsync(location);
  let position = "N/A";
  if (address.length > 0) {
    position = address[0].street + "," + address[0].city;
  }
  return position;
}
function Item(props) {
  return (
    <Block key={props.item._id} flex={1} row style={styles.item}>
      <Block flex={0.2} center>
        <Image style={{ height: 50, width: 50 }} source={locImg} />
      </Block> 
      <Block flex={0.5}>
        <Text size={18}>{props.item.address}</Text>
      </Block>
      <Block flex={0.25} center>
        <Text size={15} >{moment(props.item.time).format("DD-MM-YYYY")}</Text>
        <Text size={15}>{moment(props.item.time).format("LT")}</Text>
      </Block>
    </Block>
  );
}


const FirstRoute = ({ data }) => {
  return (
    <View style={[styles.scene]}>
      <FlatList
        data={data}
        ListEmptyComponent={<EmptyList />}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

const SecondRoute = ({ data }) => (
  <View style={[styles.scene]}>
    <MapHistory data={data} />
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

export default function LocationHistory(props) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Locations' },
    { key: 'second', title: 'Map' },
  ]);
  const [locationHistory, setLocationHistory] = useState([]);


  const getAddresses = async (positionHistory) => {
    let newPositionHistory = [...positionHistory];
    for (let i = 0; i < positionHistory.length; i++) {
      let location = { latitude: parseFloat(positionHistory[i].latitude), longitude: parseFloat(positionHistory[i].longitude) };
      let address = await getAddress(location);
      newPositionHistory[i] = { ...positionHistory[i], address };
    };
    return newPositionHistory;
  }


  useEffect(() => {

    async function fetchAdresses() {
      let child = props.route.params.child;
      if (child.hasOwnProperty("positionHistory")) {
        let positionHistory = child.positionHistory;
        let newPositionHistory = await getAddresses(positionHistory);
        setLocationHistory(newPositionHistory);
      }
    }
    fetchAdresses();
  }, []);

  const renderScene = SceneMap({
    first: () => <FirstRoute data={locationHistory} />,
    second: () => <SecondRoute data={locationHistory} />,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'maroon' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={styles.container}
    />
  );
}
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "openSans",
    marginTop: Constants.statusBarHeight,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
  item: {
    //backgroundColor: '#e8e8e8',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    //justifyContent:"center",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#e8e8e8"
  }
});
