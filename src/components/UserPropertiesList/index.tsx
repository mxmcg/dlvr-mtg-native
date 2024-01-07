import React from "react";
import { useQuery } from "@apollo/client";
import { View, Text, StyleSheet, ScrollView } from "react-native";

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

const UserPropertiesComponent = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER_PROPERTIES_QUERY, {
    variables: { userId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView style={styles.container}>
      {data.getUserProperties.map((property, index) => (
        <View key={index} style={styles.propertyBox}>
          <Text style={styles.propertyAddress}>{property.propertyAddress}</Text>
          <Text>
            Purchase Price: ${formatNumberWithCommas(property.purchasePrice)}
          </Text>
          <Text>
            Purchase Date: {formatDate(Number(property.purchaseDate))}
          </Text>
          <Text>
            Original Loan Amount: $
            {formatNumberWithCommas(property.originalLoanAmount)}
          </Text>
          <Text>
            Current Loan Amount: $
            {formatNumberWithCommas(property.currentLoanAmount)}
          </Text>
          <Text>
            Interest Rate: {formatNumberWithCommas(property.interestRate)}%
          </Text>
          <Text>Home Type: {property.homeType}</Text>
          {index < data.getUserProperties.length - 1 && (
            <View style={styles.divider} />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});

export default UserPropertiesComponent;
