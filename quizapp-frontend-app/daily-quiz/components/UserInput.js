import React from "react";
import { Text, View, TextInput } from "react-native";

const UserInput = ({
  name,
  value,
  setValue,
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text> {name} </Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        style={{
          borderBottomColor: "#8e93a1",
          borderBottomWidth: 0.5,
          height: 48,
          marginBottom: 30,
        }}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

export default UserInput;
