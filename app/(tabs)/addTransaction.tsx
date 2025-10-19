import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"deposit" | "Make Payment">("Make Payment");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSave = () => {
    if (!amount || !description) {
      setPopupMessage("Please fill in all fields!");
      setPopupVisible(true);
      return;
    }

    console.log({
      amount,
      description,
      type,
      date: new Date().toLocaleDateString(),
    });

    setPopupMessage("Transaction Added Successfully!");
    setPopupVisible(true);

    setAmount("");
    setDescription("");
  };

  const handleMakePayment = () => {
    setType("Make Payment");
    setPopupMessage("Ready to make a payment — fill in the details");
    setPopupVisible(true);
  };

  return (
    <View style={styles.container}>
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


      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "Make Payment" && styles.typeButtonActive,
          ]}
          onPress={handleMakePayment}>
          <Ionicons
            name="arrow-up-circle-outline"
            size={20}
            color={type === "Make Payment" ? "white" : "#FFD700"}/>
          <Text
            style={[
              styles.typeButtonText,
              type === "Make Payment" && styles.typeButtonTextActive,
            ]}>
            Make Payment
          </Text>
        </TouchableOpacity>
      </View>

  
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Transaction</Text>
      </TouchableOpacity>

      <Modal
        visible={popupVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPopupVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{popupMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPopupVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginVertical: 50,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default AddTransaction;
