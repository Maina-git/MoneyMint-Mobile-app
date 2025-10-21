import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link } from "expo-router";

const Profile = ({ navigation }: any) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email || "");
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          setUserName(snapshot.data().name || "");
        } else {
          console.log("User document not found in Firestore");
        }
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Signed Out", "You have been logged out successfully");
      navigation.replace("SignIn");
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Profile</Text>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.avatarIcon}>
          <Ionicons name="person-circle-outline" size={150} color="#FFD700" />
        </View>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.optionsContainer}>
    <Link href="/addTransaction" asChild>
  <TouchableOpacity style={styles.option}>
     <Ionicons name="swap-horizontal-outline" size={24} color="#FFD700" />
    <Text style={styles.optionText}>Make Transactions</Text>
  </TouchableOpacity>
</Link>

<Link href="/transactions" asChild>
  <TouchableOpacity style={styles.option}>
     <Ionicons name="notifications-outline" size={24} color="#FFD700" />
    <Text style={styles.optionText}>Transactions History</Text>
  </TouchableOpacity>
</Link>

       <TouchableOpacity onPress={handleLogout} style={[styles.option, styles.logout]}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={[styles.optionText, { color: "#fff" }]}>Log Out</Text>
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
  avatarIcon: {
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
    backgroundColor: "#FFD700",
    borderBottomWidth: 0,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
});

export default Profile;

















