import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import FooterTabs from "../components/FooterTabs";
import { AuthContext } from "../context/auth";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import CircleLogo from "../components/CircleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
const Account = ({ navigation }) => {
  const { state, setState } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (state) {
      const { name, email, role} = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!password) {
      alert("Password is required");
      setLoading(false);
      return;
    }
    // api request
    try {
      // console.log("im here")
      const { data } = await axios.post("/update-password", { password });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("👍 Password updated");
        setPassword("");
        setLoading(false);
      }
    } catch (err) {
      alert("Password update failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const signOut = async () => {
    setState({ user: null, token: "" });
    await AsyncStorage.removeItem("@auth");
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
        marginTop: 0,
      }}
    >
      <View style={{ marginVertical: 100 }}>
        <CircleLogo>
          <Image
            source={{
              uri: `https://via.placeholder.com/500x500.png?text=${name?.charAt(
                0
              )}`,
            }}
            style={{
              width: 190,
              height: 190,
              borderRadius: 100,
              marginVertical: 20,
            }}
          />
        </CircleLogo>

        <Text
          style={{
            fontSize: 24,
            color: "#333",
            textAlign: "center",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            paddingBottom: 10,
            fontSize: 18,
            color: "#333",
            textAlign: "center",
          }}
        >
          {email}
        </Text>
        <Text
          light
          style={{
            paddingBottom: 30,
            fontSize: 12,
            color: "#333",
            textAlign: "center",
          }}
        >
          {role}
        </Text>

        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoComplteType="password"
        />

        <SubmitButton
          title="Update Password"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <SubmitButton
          title="Sign Out"
          handleSubmit={signOut}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};
export default Account;
