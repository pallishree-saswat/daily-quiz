import React, { useState, useContext } from "react";
import { Text, View, StatusBar, ScrollView } from "react-native";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/CircleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, setState } = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/signin`, {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save in context
        setState(data);
        // save response in async storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("SIGN IN SUCCESS => ", data);
        alert("Sign in successful");
        // redirect
        navigation.navigate("Home");
      }
    } catch (err) {
      alert("Signup failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
      <StatusBar />
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        <Text
          style={{
            fontSize: 24,
            color: "#333",
            textAlign: "center",
          }}
        >
          Sign In
        </Text>

        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
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
          Dont have an account ?
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={{ color: "#ff2222" }}
          >
            Sign Up{" "}
          </Text>
        </Text>
        <Text
           onPress={() => navigation.navigate("ForgotPassword")}
            style={{ color: "#ff2222",marginTop: 10,fontSize: 15, textAlign: "center"  }}
          >
            Forgot Password{" "}
          </Text>
      </View>
    </ScrollView>
  );
};

export default Signin;
