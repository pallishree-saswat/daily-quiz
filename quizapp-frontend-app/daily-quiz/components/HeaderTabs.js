import React, { useContext } from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { AuthContext } from "../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const HeaderTabs = () => {
  const { state, setState } = useContext(AuthContext);

  const signOut = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };

  // hooks
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("TrendingLinks")}>
        <FontAwesome5 name="bell" size={25} color="#ff9900" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default HeaderTabs;
