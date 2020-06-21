import React, { useState, useEffect } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import { Block } from "galio-framework";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function Loading(props) {

  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });
  return (
    <>
      {
        props.show ?
          <Block flex={1} style={{ height: dimensions.screen.height, width: dimensions.screen.width, position: "absolute", justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={50} color="#555" />
          </Block>
          : null
      }
    </>
  );
}