import React from "react";
import { Text, View, StatusBar, TouchableOpacity } from "react-native";
export default function SubmitButton({ title, handleSubmit, loading }) {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      style={{
        backgroundColor: "#ff9900",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 24,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          color: "#333",
          textAlign: "center",
        }}
      >
        {loading ? "Loading" : title}
      </Text>
    </TouchableOpacity>
  );
}
