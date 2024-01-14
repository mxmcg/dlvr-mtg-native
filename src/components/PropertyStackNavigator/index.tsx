import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PropertyDetails from "../PropertyDetails";
import UserPropertiesComponent from "../UserPropertiesList";

const PropertyStack = createNativeStackNavigator();

function PropertyStackNavigator({ userId }) {
  return (
    <PropertyStack.Navigator>
      <PropertyStack.Screen
        name="PropertyList"
        component={(props) => (
          <UserPropertiesComponent
            {...props}
            userId="65973c1090d46239cf7c6acb"
          />
        )}
      />
      <PropertyStack.Screen
        name="PropertyDetails"
        component={(props) => <PropertyDetails {...props} />}
      />
    </PropertyStack.Navigator>
  );
}

export default PropertyStackNavigator;
