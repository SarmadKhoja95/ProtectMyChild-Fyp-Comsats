import React from 'react';
import { View } from "react-native";
import { Provider } from 'react-redux';
import store from "./store";
import Navigations from "./navigations/navigations";



export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Provider store={store}>
        <Navigations />
      </Provider>
    </View>
  );
}

