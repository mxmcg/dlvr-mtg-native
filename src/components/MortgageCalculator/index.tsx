import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { gql, useLazyQuery } from "@apollo/client";

const MORTGAGE_CALCULATION_QUERY = gql`
  query CalculateMortgage(
    $loanAmount: Float!
    $interestRate: Float!
    $term: Int!
    $propertyValue: Float!
  ) {
    calculateMortgage(
      loanAmount: $loanAmount
      interestRate: $interestRate
      term: $term
      propertyValue: $propertyValue
    ) {
      monthlyPayment
      propertyValue
    }
  }
`;

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [propertyValue, setPropertyValue] = useState("");

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [calculateMortgage, { data, loading, error }] = useLazyQuery(
    MORTGAGE_CALCULATION_QUERY
  );

  const handleCalculateClick = () => {
    calculateMortgage({
      variables: {
        propertyValue: parseFloat(propertyValue.replace(/[^0-9.]/g, "")),
        loanAmount: parseFloat(loanAmount.replace(/[^0-9.]/g, "")),
        interestRate: parseFloat(interestRate.replace(/[^0-9.]/g, "")),
        term: parseInt(term.replace(/[^0-9]/g, ""), 10),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Property Value</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#fff"
        placeholder="Enter property value"
        value={propertyValue}
        onChangeText={setPropertyValue}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Loan Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter loan amount"
        placeholderTextColor="#fff"
        value={loanAmount}
        onChangeText={setLoanAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Interest Rate</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#fff"
        placeholder="Enter interest rate"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Term (years)</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#fff"
        placeholder="Enter term in years"
        value={term}
        onChangeText={setTerm}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleCalculateClick}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {/* ... Result Text */}
      {loading && <Text style={styles.text}>Saving calculation...</Text>}
      {error && <Text style={styles.text}>Error: {error.message}</Text>}
      {data && (
        <View>
          <Text style={styles.resultText}>
            Monthly Payment: $
            {numberWithCommas(data.calculateMortgage.monthlyPayment.toFixed(2))}
          </Text>
          <Text style={styles.successText}>
            Calculation saved successfully.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 40,
    borderRadius: 4,
    color: "#fff", // Set text color to white
  },
  text: {
    marginBottom: 5,
    color: "#fff", // Set text color to white
  },
  button: {
    backgroundColor: "#fff", // Set button background to white
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#000", // Set button text color
    fontSize: 16,
    fontWeight: "bold",
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff", // Set text color to white
  },
  successText: {
    marginTop: 2,
    color: "green",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MortgageCalculator;
