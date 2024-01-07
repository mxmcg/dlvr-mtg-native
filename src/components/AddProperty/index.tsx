import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { gql, useMutation } from "@apollo/client";

const generateRandomAddress = () => {
  const streetNames = ["Maple", "Oak", "Pine", "Cedar", "Elm"];
  const streetType = ["St", "Ave", "Blvd", "Rd", "Ln"];
  return `${Math.floor(Math.random() * 1000)} ${
    streetNames[Math.floor(Math.random() * streetNames.length)]
  } ${streetType[Math.floor(Math.random() * streetType.length)]}`;
};

const ADD_REAL_ESTATE_PROPERTY_MUTATION = gql`
  mutation AddRealEstateProperty(
    $userId: String!
    $propertyAddress: String!
    $purchasePrice: Float!
    $purchaseDate: String!
    $originalLoanAmount: Float!
    $currentLoanAmount: Float!
    $interestRate: Float!
    $homeType: String!
  ) {
    addRealEstateProperty(
      userId: $userId
      propertyAddress: $propertyAddress
      purchasePrice: $purchasePrice
      purchaseDate: $purchaseDate
      originalLoanAmount: $originalLoanAmount
      currentLoanAmount: $currentLoanAmount
      interestRate: $interestRate
      homeType: $homeType
    ) {
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

const formatCurrency = (value) => {
  let num = value.replace(/[^0-9.]/g, ""); // Remove all non-numeric characters
  if (!num) return "";
  num = parseFloat(num).toFixed(2);
  return `$${num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; // Format as currency
};

const formatPercentage = (value) => {
  let num = value.replace(/[^0-9.]/g, ""); // Remove all non-numeric characters
  if (!num) return "";
  num = parseFloat(num).toFixed(2);
  return `${num}%`; // Format as percentage
};

const AddPropertyComponent = () => {
  const [propertyAddress, setPropertyAddress] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [originalLoanAmount, setOriginalLoanAmount] = useState("");
  const [currentLoanAmount, setCurrentLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [homeType, setHomeType] = useState("");

  const [addRealEstateProperty, { data, loading, error }] = useMutation(
    ADD_REAL_ESTATE_PROPERTY_MUTATION
  );

  const handlePurchasePriceChange = (text) => {
    setPurchasePrice(formatCurrency(text));
  };

  const handleOriginalLoanAmountChange = (text) => {
    setOriginalLoanAmount(formatCurrency(text));
  };

  const handleCurrentLoanAmountChange = (text) => {
    setCurrentLoanAmount(formatCurrency(text));
  };

  const handleInterestRateChange = (text) => {
    setInterestRate(formatPercentage(text));
  };

  const handleSubmit = async () => {
    try {
      // Remove formatting and convert to float
      const formattedPurchasePrice = parseFloat(
        purchasePrice.replace(/[^\d.-]/g, "")
      );
      const formattedOriginalLoanAmount = parseFloat(
        originalLoanAmount.replace(/[^\d.-]/g, "")
      );
      const formattedCurrentLoanAmount = parseFloat(
        currentLoanAmount.replace(/[^\d.-]/g, "")
      );
      const formattedInterestRate = parseFloat(
        interestRate.replace(/[^\d.-]/g, "")
      );

      const result = await addRealEstateProperty({
        variables: {
          userId: "65973c1090d46239cf7c6acb",
          propertyAddress,
          purchasePrice: formattedPurchasePrice,
          purchaseDate,
          originalLoanAmount: formattedOriginalLoanAmount,
          currentLoanAmount: formattedCurrentLoanAmount,
          interestRate: formattedInterestRate,
          homeType,
        },
      });
      // ... rest of your submit logic
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Generate random defaults
    setPropertyAddress(generateRandomAddress());
    const randomPurchasePrice = (Math.random() * 1000000 + 100000).toFixed(2);
    setPurchasePrice(formatCurrency(randomPurchasePrice));

    // Random date in the past up to 50 years
    const yearsAgo = 30;
    const currentDate = new Date();
    const pastDate = new Date(
      currentDate.getFullYear() - yearsAgo,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const randomTime =
      pastDate.getTime() +
      Math.random() * (currentDate.getTime() - pastDate.getTime());
    const randomDate = new Date(randomTime);
    setPurchaseDate(randomDate.toISOString().split("T")[0]);

    const randomOriginalLoanAmount = (Math.random() * 500000 + 100000).toFixed(
      2
    );
    setOriginalLoanAmount(formatCurrency(randomOriginalLoanAmount));

    const randomCurrentLoanAmount = (Math.random() * 500000 + 100000).toFixed(
      2
    );
    setCurrentLoanAmount(formatCurrency(randomCurrentLoanAmount));

    const randomInterestRate = (Math.random() * 5 + 2).toFixed(2);
    setInterestRate(formatPercentage(randomInterestRate));

    setHomeType(
      ["Single Family", "Condo", "Multifamily"][Math.floor(Math.random() * 3)]
    );
  }, []);

  {
    loading && <p>Saving property...</p>;
  }
  {
    error && <p>Error saving property: {error.message}</p>;
  }

  console.log("purchaseDate", purchaseDate);

  return (
    <ScrollView style={styles.container}>
      {/* Property Address Input */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Property Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter property address"
          value={propertyAddress}
          onChangeText={setPropertyAddress}
        />
      </View>

      {/* Date of Purchase Input */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Date of Purchase (MM/DD/YYYY)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter date (MM/DD/YYYY)"
          value={purchaseDate}
          onChangeText={setPurchaseDate}
        />
      </View>

      <View style={styles.formControl}>
        <Text style={styles.label}>Original Purchase Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter original purchase price"
          value={purchasePrice}
          onChangeText={handlePurchasePriceChange}
          keyboardType="numeric"
        />
      </View>

      {/* Original Loan Amount Input */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Original Loan Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter original loan amount"
          value={originalLoanAmount}
          onChangeText={handleOriginalLoanAmountChange}
          keyboardType="numeric"
        />
      </View>

      {/* Current Loan Amount Input */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Current Loan Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter current loan amount"
          value={currentLoanAmount}
          onChangeText={handleCurrentLoanAmountChange}
          keyboardType="numeric"
        />
      </View>

      {/* Interest Rate Input */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Interest Rate</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter interest rate"
          value={interestRate}
          onChangeText={handleInterestRateChange}
          keyboardType="numeric"
        />
      </View>

      {/* Home Type Picker */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Home Type</Text>
        <Picker
          selectedValue={homeType}
          onValueChange={setHomeType}
          style={styles.picker}
        >
          <Picker.Item label="Single Family" value="Single Family" />
          <Picker.Item label="Condo" value="Condo" />
          <Picker.Item label="Multifamily" value="Multifamily" />
        </Picker>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Property</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formControl: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    overflow: "hidden",
  },
  picker: {
    color: "#333",
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginTop: 10,
  },
});

export default AddPropertyComponent;
