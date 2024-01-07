import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
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
        placeholder="Enter property value"
        value={propertyValue}
        onChangeText={setPropertyValue}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Loan Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter loan amount"
        value={loanAmount}
        onChangeText={setLoanAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Interest Rate</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter interest rate"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Term (years)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter term in years"
        value={term}
        onChangeText={setTerm}
        keyboardType="numeric"
      />

      <Button title="Calculate" onPress={handleCalculateClick} />

      {loading && <Text>Saving calculation...</Text>}
      {error && <Text>Error: {error.message}</Text>}
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  label: {
    marginBottom: 5,
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
  },
  successText: {
    marginTop: 2,
    color: "green",
  },
});

export default MortgageCalculator;
