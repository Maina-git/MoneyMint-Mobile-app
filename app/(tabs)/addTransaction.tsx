import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"deposit" | "withdraw">("deposit");

  const handleSave = () => {
    if (!amount || !description) {
      alert("Please fill all fields");
      return;
    }
    console.log({
      amount,
      description,
      type,
      date: new Date().toLocaleDateString(),
    });
    alert("Transaction Added ✅");
    setAmount("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      {/* Header with Icon */}
      <View style={styles.headerContainer}>
        <Ionicons name="swap-horizontal-outline" size={32} color="#FFD700" />
        <Text style={styles.header}>Add Transaction</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}/>
      <TextInput
        style={styles.input}
        placeholder="Description (e.g. Salary, Groceries)"
        value={description}
        onChangeText={setDescription}/>

      {/* Type Selector */}
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "deposit" && styles.typeButtonActive,
          ]}
          onPress={() => setType("deposit")}>
          <Ionicons
            name="arrow-down-circle-outline"
            size={20}
            color={type === "deposit" ? "white" : "#FFD700"}/>
          <Text
            style={[
              styles.typeButtonText,
              type === "deposit" && styles.typeButtonTextActive,
            ]}>
            Deposit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "withdraw" && styles.typeButtonActive,
          ]}
          onPress={() => setType("withdraw")}>
          <Ionicons
            name="arrow-up-circle-outline"
            size={20}
            color={type === "withdraw" ? "white" : "#FFD700"}/>
          <Text
            style={[
              styles.typeButtonText,
              type === "withdraw" && styles.typeButtonTextActive,
            ]}>
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical:50,
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    marginLeft: 10,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  typeButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  typeButtonActive: {
    backgroundColor: "#FFD700",
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFD700",
    marginLeft: 8,
  },
  typeButtonTextActive: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#FFD700",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default AddTransaction;
