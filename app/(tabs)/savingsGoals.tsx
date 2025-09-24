import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const sampleGoals = [
  { id: "1", title: "New Phone", target: 800, saved: 400 },
  { id: "2", title: "Emergency Fund", target: 2000, saved: 1200 },
  { id: "3", title: "Vacation", target: 1500, saved: 600 },
];

const SavingsGoals = () => {
  const [goals, setGoals] = useState(sampleGoals);

  const renderGoal = ({ item }: any) => {
    const progress = item.saved / item.target;
    return (
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>{item.title}</Text>
          <Text style={styles.goalAmount}>
            ${item.saved} / ${item.target}
          </Text>
        </View>
        <Progress.Bar
          progress={progress}
          width={null}
          height={10}
          borderRadius={8}
          color="#FFD700"
          unfilledColor="#f0f0f0"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Ionicons name="trophy-outline" size={32} color="#FFD700" />
        <Text style={styles.header}>Savings & Goals</Text>
      </View>

      {/* Total Savings */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Savings</Text>
        <Text style={styles.totalAmount}>
          $
          {goals.reduce((acc, goal) => acc + goal.saved, 0).toLocaleString()}
        </Text>
      </View>

      {/* Goals List */}
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={renderGoal}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Add New Goal Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={22} color="#333" />
        <Text style={styles.addButtonText}>Add New Goal</Text>
      </TouchableOpacity>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginLeft: 10,
  },
  totalCard: {
    backgroundColor: "#FFD700",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  totalLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
  },
  goalCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  goalAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#777",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginLeft: 8,
  },
});

export default SavingsGoals;
