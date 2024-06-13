import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Foundation name="home" size={24} color="black" />
                    ),
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    title: "Transactions",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="compare-arrows"
                            size={24}
                            color="black"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={24} color="black" />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
