import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth";
import { PostProvider } from "./context/post";
import ScreensNav from "./components/ScreensNav";

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PostProvider>
          <ScreensNav />
        </PostProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
