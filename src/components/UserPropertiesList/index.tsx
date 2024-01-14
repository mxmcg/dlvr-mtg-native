import React from "react";
import { useQuery } from "@apollo/client";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import { gql } from "@apollo/client";

const GET_USER_PROPERTIES_QUERY = gql`
  query GetUserProperties($userId: String!) {
    getUserProperties(userId: $userId) {
      propertyAddress
      purchasePrice
      purchaseDate
      originalLoanAmount
      currentLoanAmount
      interestRate
      homeType
    }
  }
`;

const formatNumberWithCommas = (number) => {
  return number ? number.toLocaleString() : number;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const UserPropertiesComponent = ({ userId, navigation }) => {
  const { data, loading, error } = useQuery(GET_USER_PROPERTIES_QUERY, {
    variables: { userId },
  });

  const handlePropertySelect = (property) => {
    navigation.navigate("PropertyDetails", { property });
  };

  if (loading) return <Text style={styles.textStyle}>Loading...</Text>;
  if (error)
    return <Text style={styles.textStyle}>Error: {error.message}</Text>;

  return (
    <ScrollView style={styles.container}>
      {data.getUserProperties.map((property, index) => (
        <TouchableOpacity
          key={index}
          style={styles.propertyBox}
          onPress={() => handlePropertySelect(property)}
        >
          <Text style={[styles.propertyAddress, styles.textStyle]}>
            {property.propertyAddress.substring(0, 30)}...{" "}
          </Text>
          <Text style={styles.textStyle}>
            Purchase Price: ${formatNumberWithCommas(property.purchasePrice)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#00093b",
  },
  propertyBox: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  propertyAddress: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textStyle: {
    color: "#fff", // Set the text color to white
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});

export default UserPropertiesComponent;
