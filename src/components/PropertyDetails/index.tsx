import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const PropertyDetails = ({ route, navigation }) => {
  const { property } = route.params;
  const goBack = () => navigation.goBack();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.propertyBox}>
        <Text style={[styles.propertyAddress, styles.textStyle]}>
          {property.propertyAddress}
        </Text>
        <Text style={styles.textStyle}>
          Purchase Price: ${formatNumberWithCommas(property.purchasePrice)}
        </Text>
        <Text style={styles.textStyle}>
          Purchase Date: {formatDate(Number(property.purchaseDate))}
        </Text>
        <Text style={styles.textStyle}>
          Original Loan Amount: $
          {formatNumberWithCommas(property.originalLoanAmount)}
        </Text>
        <Text style={styles.textStyle}>
          Current Loan Amount: $
          {formatNumberWithCommas(property.currentLoanAmount)}
        </Text>
        <Text style={styles.textStyle}>
          Interest Rate: {formatNumberWithCommas(property.interestRate)}%
        </Text>
        <Text style={styles.textStyle}>Home Type: {property.homeType}</Text>
      </View>
    </ScrollView>
  );
};

const formatNumberWithCommas = (number) => {
  return number ? number.toLocaleString() : number;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#00093b", // Correct property for setting background color
  },
  propertyBox: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    backgroundColor: "#00093b", // Example if you want a white background for the property box
  },
  propertyAddress: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  textStyle: {
    color: "#fff",
  },
  goBackButton: {
    color: "#fff",
  },
  goBackButtonText: {
    color: "#fff",
  },
});

export default PropertyDetails;
