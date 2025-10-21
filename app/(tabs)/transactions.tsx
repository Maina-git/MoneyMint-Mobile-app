import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../config/Firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const transactionsRef = collection(db, "users", user.uid, "transactions");
    const q = query(transactionsRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userTransactions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(userTransactions);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionInfo}>
        <Ionicons
          name={
            item.type === "deposit"
              ? "arrow-down-circle-outline"
              : "arrow-up-circle-outline"
          }
          size={28}
          color={item.type === "deposit" ? "#28a745" : "#FFD700"}/>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.transactionTitle}>
            {item.description || item.type}
          </Text>
          <Text style={styles.transactionDate}>
            {new Date(item.date).toLocaleString()}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: item.type === "deposit" ? "#28a745" : "#FFD700" },
        ]}>
        {item.type === "deposit"
          ? `+ $${item.amount}`
          : `- $${Math.abs(item.amount)}`}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="card-outline" size={28} color="#fff" />
      <Text style={styles.header}>Recent Transactions</Text>
       </View>

      {transactions.length === 0 ? (
        <Text style={styles.noTransactionsText}>No transactions yet</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

headerContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
},
header: {
  fontSize: 24,
  fontWeight: "700",
  color: "#0000",
  marginLeft: 10,
},
  noTransactionsText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
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









