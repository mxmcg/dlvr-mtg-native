import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import UserPropertiesList from "../UserPropertiesList";
import AddPropertyComponent from "../AddProperty";
import MortgageCalculator from "../MortgageCalculator";
import PropertyStackNavigator from "../PropertyStackNavigator";

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#00093b" }]}>
    <AddPropertyComponent />
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#00093b" }]}>
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
    first: PropertyStackNavigator,
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
