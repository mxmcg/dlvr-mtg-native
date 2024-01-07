import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import UserPropertiesList from "../UserPropertiesList";
import AddPropertyComponent from "../AddProperty";
import MortgageCalculator from "../MortgageCalculator";

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]}>
    <UserPropertiesList userId="65973c1090d46239cf7c6acb" />
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]}>
    <AddPropertyComponent />
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#3f51b5" }]}>
    <MortgageCalculator />
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Properties" },
    { key: "second", title: "Add Property" },
    { key: "third", title: "Mortgage Calculator" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      tabBarPosition="bottom" // Set the tabBarPosition to bottom
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "white" }}
          style={{ backgroundColor: "blue" }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  // You can add more styles if needed
});
