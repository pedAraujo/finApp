import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { Avatar } from "react-native-elements";
import { ProtectedRoute } from "../components/ProtectedRoute";

const TabsLayout = () => {
    const navigation = useNavigation();
    const { logout } = useAuth();

    return (
        <ProtectedRoute>
            <View style={{ flex: 1 }}>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: "#007AFF",
                        tabBarInactiveTintColor: "gray",
                    }}>
                    <Tabs.Screen
                        name="home"
                        options={{
                            title: "Home",
                            tabBarIcon: ({ color, size, focused }) => (
                                <Foundation
                                    name="home"
                                    size={24}
                                    color={focused ? "#007AFF" : "gray"}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="transactions"
                        options={{
                            title: "Transactions",
                            tabBarIcon: ({ color, size, focused }) => (
                                <MaterialIcons
                                    name="compare-arrows"
                                    size={24}
                                    color={focused ? "#007AFF" : "gray"}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="profile"
                        options={{
                            title: "Profile",
                            tabBarIcon: ({ color, size, focused }) => (
                                <Ionicons
                                    name="person"
                                    size={24}
                                    color={focused ? "#007AFF" : "gray"}
                                />
                            ),
                        }}
                    />
                </Tabs>
            </View>
        </ProtectedRoute>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default TabsLayout;
