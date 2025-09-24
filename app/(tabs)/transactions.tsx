import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const sampleTransactions = [
  { id: "1", title: "Deposit", amount: 200, date: "Sep 20, 2025", type: "deposit" },
  { id: "2", title: "Grocery Shopping", amount: -50, date: "Sep 18, 2025", type: "withdraw" },
  { id: "3", title: "Salary", amount: 1200, date: "Sep 15, 2025", type: "deposit" },
  { id: "4", title: "Electric Bill", amount: -80, date: "Sep 12, 2025", type: "withdraw" },
];

const Transactions = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionInfo}>
        <Ionicons
          name={item.type === "deposit" ? "arrow-down-circle-outline" : "arrow-up-circle-outline"}
          size={28}
          color={item.type === "deposit" ? "#28a745" : "#dc3545"}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: item.type === "deposit" ? "#28a745" : "#dc3545" },
        ]}
      >
        {item.type === "deposit" ? `+ $${item.amount}` : `- $${Math.abs(item.amount)}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Transactions</Text>
      <FlatList
        data={sampleTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  transactionInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  transactionDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Transactions;
