import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/JWTAuthContext";

const TabsLayout = () => {
    const { isAuthenticated, isInitialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialized) {
            if (!isAuthenticated) {
                console.log("Redirecting to login");
                router.replace("login");
            } else {
                console.log("User is authenticated");
            }
        }
    }, [isInitialized, isAuthenticated]);

    if (!isInitialized) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "gray",
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
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
                    headerShown: false,
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
                    headerShown: false,
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
    );
};

export default TabsLayout;
