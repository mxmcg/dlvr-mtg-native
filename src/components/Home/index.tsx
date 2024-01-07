// Import React Native components
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../../lib/client";
import TabViewExample from "../TabLayout";

// Import your custom components (you'll need to create React Native versions of these)
// import UserPropertiesList from './components/UserPropertiesList';
// import AddPropertyComponent from './components/AddProperty';
// import MortgageCalculator from './components/MortgageCalculator';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // React Native doesn't have localStorage, you might want to use AsyncStorage or SecureStorage
    // const token = localStorage.getItem("token");
    // setIsLoggedIn(!!token);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <View style={styles.container}>
        <Text style={isLoggedIn ? styles.loggedInText : styles.notLoggedInText}>
          {isLoggedIn ? "You are logged in!" : "You are not logged in."}
        </Text>
        <TabViewExample />
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Changed from 'center'
    alignItems: "stretch", // Changed from 'center'
  },
  loggedInText: {
    color: "green",
    textAlign: "center", // Added for text alignment
    marginTop: 10, // Added some margin at the top
  },
  notLoggedInText: {
    color: "red",
    textAlign: "center", // Added for text alignment
    marginTop: 10, // Added some margin at the top
  },
});

export default Home;
