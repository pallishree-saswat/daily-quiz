import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import { PostContext } from "../context/post";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Divider } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

dayjs.extend(relativeTime);
// posts
const Profile = ({ navigation }) => {
  // context
  const { state, setState } = useContext(AuthContext);
  const [posts, setPosts] = useContext(PostContext);
  // state
  const [userProfile, setUserProfile] = useState({});
  const [userQuestions, setUserQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const routeParamsId = route?.params?._id;

  useEffect(() => {
    // console.log(route.params);
    const fetchUserProfile = async (userId) => {
      try {
        const { data } = await axios.get(`/user-profile/${userId}`);
        // console.log("user profile data => ", data);
        setUserProfile(data.profile);
        setUserQuestions(data.questions);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };
    routeParamsId
      ? fetchUserProfile(routeParamsId)
      : fetchUserProfile(state.user._id);
  }, []);

  const handleDelete = async (postId) => {
    // console.log("delete", postId);
    try {
      const { data } = await axios.delete(`/question-delete/${postId}`);
      // console.log("data", data);
      // update userQuestions
      setUserQuestions((posts) => {
        const index = userQuestions.findIndex((p) => p._id === postId);
        userQuestions.splice(index, 1);
        return [...posts];
      });
      // update context
      setPosts((posts) => {
        const index = posts.findIndex((p) => p._id === postId);
        posts.splice(index, 1);
        return [...posts];
      });
      alert("🐸 Deleted successfully!");
    } catch (err) {
      console.log(err);
      alert("🐸 Delete failed");
    }
  };

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/loading.gif")}
          style={{ height: 100, width: 100 }}
        />
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/blur.jpeg")}
      style={{ flex: 1, height: "100%" }}
      resizeMode="cover"
      blurRadius={5}
    >
      <Text
        style={{
          color: "#fff",
          paddingTop: 30,
          paddingBottom: 10,
          fontSize: 40,
          textAlign: "center",
        }}
      >
        Profile
      </Text>

      {/* <SafeAreaView> */}
      <View
        style={{
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Image
          source={{
            uri: userProfile?.image?.url
              ? userProfile.image.url
              : `https://via.placeholder.com/500x500.png?text=${userProfile?.name?.charAt(
                  0
                )}`,
          }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
          }}
        />
        <Text style={{ paddingTop: 10, color: "#ccc" }}>
          {userProfile.name}
        </Text>
        <Text style={{ paddingTop: 10, color: "#b3b3b3" }}>
          {userProfile.role}
        </Text>
        <Text style={{ paddingTop: 10, color: "#b3b3b3" }}>
          Joined {dayjs(userProfile.createdAt).fromNow()}
        </Text>
      </View>

      {/* <Divider /> */}
      <View style={{ paddingBottom: 20 }}></View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ paddingTop: 10, color: "#b3b3b3", textAlign: "center" }}>
          {userQuestions.length} Questions
        </Text>

        {userQuestions.map((post) => (
          <View
            key={post._id}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "#ccc" }}>{post?.question}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#ccc" }}>{post?.views} Views</Text>
              {state?.user?._id === post?.postedBy._id && (
                <TouchableOpacity onPress={() => handleDelete(post._id)}>
                  <FontAwesome5 name="trash" color="#ff9900" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      {/* </SafeAreaView> */}
    </ImageBackground>
  );
};

export default Profile;
