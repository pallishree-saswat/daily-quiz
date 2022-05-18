import React, { useState, useContext } from "react";
import { Text, View, StatusBar, ScrollView } from "react-native";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/CircleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, setState } = useContext(AuthContext);
  // console.log("NAVIGATION -> ", navigation);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !phoneNumber) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/signup`, {
        name,
        email,
        phoneNumber,
        password,
        
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save to context
        setState(data);
        // save response in async storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("SIGN IN SUCCESS => ", data);
        alert("Sign up successful");
        // navigation.naviagte("Home");
      }
    } catch (err) {
      alert("Signup failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <ScrollView>
      <View style={{ marginVertical: 100, flex: 1, justifyContent: "center" }}>
        <CircleLogo />
        <Text
          style={{
            fontSize: 24,
            color: "#333",
            textAlign: "center",
          }}
        >
          Sign up
        </Text>
        <UserInput
          name="Name"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="Phone Number"
          value={phoneNumber}
          setValue={setPhoneNumber}
        />
        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoComplteType="password"
        />

        <SubmitButton
          title="Submit"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <Text style={{ fontSize: 15, textAlign: "center" }}>
          Already Joined ?
          <Text
            onPress={() => navigation.navigate("Signin")}
            style={{ color: "#ff2222" }}
          >
            Sign In{" "}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Signup;
