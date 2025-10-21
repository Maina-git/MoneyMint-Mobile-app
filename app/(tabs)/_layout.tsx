import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SignIn from "../auth/SignIn";

export default function _Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function onAuthSuccess() {
    setIsAuthenticated(true);
  }

  if (!isAuthenticated) {
    return <SignIn onAuthSuccess={onAuthSuccess} />;
  }
  
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 100,
          paddingBottom: 8,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 6,
          elevation: 5,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "index") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "addTransaction") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "transactions") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "SavingsGoals") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="addTransaction" options={{ title: "Transact" }} />
      <Tabs.Screen name="transactions" options={{ title: "History" }} />
      <Tabs.Screen name="Goals" options={{ title: "Savings" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
