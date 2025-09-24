import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
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

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-down-circle-outline" size={24} color="#333" />
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButtonOutline}>
          <Ionicons name="arrow-up-circle-outline" size={24} color="#FFD700" />
          <Text style={styles.actionTextOutline}>Withdraw</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
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
    color: "#333",
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
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
    color: "#333",
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
});

export default Home;
