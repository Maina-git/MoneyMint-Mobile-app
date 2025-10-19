import React, { useEffect, useState } from "react";
import { auth, db } from "../config/Firebase";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  doc,
  updateDoc,
  increment,
  onSnapshot
} from "firebase/firestore";

import {onAuthStateChanged, signOut} from "firebase/auth";


const Home = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<"deposit" | "withdraw">(
    "deposit"
  );
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState("");

useEffect(()=>{
  const unsubscribeAuth = onAuthStateChanged(auth, async (user)=>{
    if(user){
      const userRef = doc(db, "users", user.uid);



      const unsubscribeSnapshot = onSnapshot(userRef, (snapshot)=>{
        if(snapshot.exists()){
          const data = snapshot.data();
          setBalance(data.balance || 0);
          setUserName(data.name || "User");
        }
      });
      return unsubscribeSnapshot;
    }else {
      console.log("No user signed in");
    }
  });
  return unsubscribeAuth;
}, []);


  const handleOpenPopup = (type: "deposit" | "withdraw") => {
    setTransactionType(type);
    setPopupVisible(true);
  };

  const handleConfirm = async () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }
   const value = parseFloat(amount);
   if(isNaN(value) || value <= 0){
    Alert.alert("Error", "Please enter a valid positive number");
    return;
   }

   const user = auth.currentUser;
   if(!user) return;
   const userRef = doc(db, "users", user.uid);

try{
  if(transactionType === "deposit"){
    await updateDoc(userRef, {balance:increment(value)});
    Alert.alert("Sucess", `Deposited $${value}`);
  }else{
    if(balance < value){
      Alert.alert("Error", "Insufficient funds");
      return;
    }
    await updateDoc(userRef, { balance:increment(-value)});
    Alert.alert("Success", `Withdrew $${value}`)
  }
    alert(`${transactionType === "deposit" ? "Deposited" : "Withdrew"} $${amount}`);
    setPopupVisible(false);
    setAmount("");
}catch(error:any){
  Alert.alert("Error", error.message);
}
}


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="wallet-outline" size={50} color="#FFD700" />
        <Text style={styles.header}>MoneyMate</Text>
      </View>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Wallet Balance</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
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














