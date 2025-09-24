import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const Home = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<"deposit" | "withdraw">(
    "deposit"
  );
  const [amount, setAmount] = useState("");

  const handleOpenPopup = (type: "deposit" | "withdraw") => {
    setTransactionType(type);
    setPopupVisible(true);
  };

  const handleConfirm = () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }
    alert(`${transactionType === "deposit" ? "Deposited" : "Withdrew"} $${amount}`);
    setPopupVisible(false);
    setAmount("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="wallet-outline" size={50} color="#FFD700" />
        <Text style={styles.header}>MoneyMate</Text>
      </View>


      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Wallet Balance</Text>
        <Text style={styles.balanceAmount}>$1,250.50</Text>
      </View>

  
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleOpenPopup("deposit")}>
          <Ionicons name="arrow-down-circle-outline" size={24} color="white" />
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButtonOutline}
          onPress={() => handleOpenPopup("withdraw")}>
          <Ionicons name="arrow-up-circle-outline" size={24} color="#FFD700" />
          <Text style={styles.actionTextOutline}>Withdraw</Text>
        </TouchableOpacity>
      </View>


      <Modal
        visible={popupVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPopupVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {transactionType === "deposit" ? "Deposit" : "Withdraw"} Funds
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}/>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setPopupVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirm}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 10,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    marginVertical: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    color: "#000",
    marginLeft: 10,
  },
  balanceCard: {
    backgroundColor: "#FFD700",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 40,
  },
  balanceLabel: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
  },
  actionButtonOutline: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  actionTextOutline: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFD700",
    marginLeft: 8,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: "#FFD700",
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "#FFD700",
    marginLeft: 10,
  },
  cancelText: {
    color: "#FFD700",
    fontWeight: "600",
    fontSize: 16,
  },
  confirmText: {
    color: "#333",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Home;
