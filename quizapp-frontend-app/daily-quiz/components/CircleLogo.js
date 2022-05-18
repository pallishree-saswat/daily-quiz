import React from "react";
import { View, Image } from "react-native";

const CircleLogo = ({ children }) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 20,
    }}
  >
    <View
      style={{
        backgroundColor: "#fff",
        height: 170,
        width: 170,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    {children ? (
      children
    ) : (
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 200, height: 100, marginVertical: 10 }}
      />
    )}
  </View>
  </View>
);

export default CircleLogo;
