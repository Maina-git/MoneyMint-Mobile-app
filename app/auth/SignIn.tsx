import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { doc, setDoc } from "firebase/firestore";

const SignIn = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = async () => {
    if (isRegister && !name) {
      Alert.alert("Error", "Please enter your name");
      return;
    }
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add new user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
          balance: 0,
          createdAt: new Date(),
        });

        Alert.alert("Success", "Account created successfully");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Signed in successfully");
      }

      onAuthSuccess();
    } catch (error: any) {
      Alert.alert("Authentication Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="cash-outline" size={50} color="#FFD700" />
        <Text style={styles.header}>MoneyMate</Text>
      </View>

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isRegister ? "Register" : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => setIsRegister(!isRegister)}
        >
          <Text style={styles.buttonOutlineText}>
            {isRegister ? "Sign In" : "Create account"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Original MoneyMate styles unchanged
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
