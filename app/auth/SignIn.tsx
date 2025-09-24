import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // money icon (use Expo vector icons)

const SignIn = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  function handleRegister() {
    onAuthSuccess();
  }

  function handleLogin() {
    onAuthSuccess();
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="cash-outline" size={50} color="#FFD700" />
        <Text style={styles.header}>MoneyMate</Text>
      </View>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      {/* Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutline} onPress={handleLogin}>
          <Text style={styles.buttonOutlineText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    marginTop: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  bottomContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonOutlineText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFD700",
  },
});

export default SignIn;
