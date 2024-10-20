import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    buttonContainer: {
        width: "100%",
        marginTop: 20,
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
    },
});
