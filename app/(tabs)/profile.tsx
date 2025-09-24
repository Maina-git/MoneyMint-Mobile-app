import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@email.com</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="person-circle-outline" size={24} color="#FFD700" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="notifications-outline" size={24} color="#FFD700" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#FFD700" />
          <Text style={styles.optionText}>Security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, styles.logout]}>
          <Ionicons name="log-out-outline" size={24} color="#dc3545" />
          <Text style={[styles.optionText, { color: "#dc3545" }]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  profileCard: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFD700",
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
    color: "#333",
  },
  logout: {
    marginTop: 30,
    borderBottomWidth: 0,
  },
});

export default Profile;
