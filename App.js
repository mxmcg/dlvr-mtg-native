import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import { StatusBar } from "expo-status-bar";
import Home from "./src/components/Home";

export default function App() {
  return (
    <NavigationContainer>
      <>
        <StatusBar style="auto" />
        <Home />
      </>
    </NavigationContainer>
  );
}
