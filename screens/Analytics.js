import React from "react";
import { Block, Text } from "galio-framework";
import Constants from 'expo-constants';



export default function Analytics(props) {
  return (
    <Block flex={1} style={{paddingTop: Constants.statusBarHeight}}>
      <Text>Analytics</Text>
    </Block>
  )
}