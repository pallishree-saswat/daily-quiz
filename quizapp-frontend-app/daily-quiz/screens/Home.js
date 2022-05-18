import React, { useContext, useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import FooterTabs from "../components/FooterTabs";
import { AuthContext } from "../context/auth";
import { PostContext } from "../context/post";
import axios from "axios";

const Home = ({ navigation }) => {
  const { state, setState } = useContext(AuthContext);
  const [posts, setPosts] = useContext(PostContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories();
    fetchposts();
  }, []);

  const fetchposts = async () => {
    const { data } = await axios.get(`/questions`);
    setPosts([...posts, ...data]);
    setLoading(false);
  };

  const fetchAllCategories = async () => {
    const { data } = await axios.get(`/categories`);
    setCategories([...categories, ...data]);
    setLoading(false);
  };

  const handlePress = async (post) => {
    // navigation.navigate("postView", { post });
  };

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "space-between", marginTop: 10 }}
      >
     <ScrollView showsVerticalScrollIndicator={false}>
          {categories &&
            categories.map((c) => (
              <View
                key={c._id}
                style={{
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" ,textAlign:'center'}}>
                  {c.name}
                </Text>
              </View>
            ))}
        </ScrollView>
        <FooterTabs />
      </SafeAreaView>
    </>
  );
};
export default Home;
