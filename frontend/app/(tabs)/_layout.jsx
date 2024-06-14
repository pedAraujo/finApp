import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "gray",
                // tabBarStyle: {
                //     // backgroundColor: "white",
                // },
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
