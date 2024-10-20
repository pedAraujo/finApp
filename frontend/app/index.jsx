import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import { router } from "expo-router";
import React from "react";
import { useAuth } from "./context/AuthContext";

export default function App() {
    const { login } = useAuth();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>FinApp</Text>
                <Button
                    title="Entrar"
                    onPress={() => {
                        console.log("index - navigating to /(tabs)/home");
                        router.navigate("/(tabs)/home");
                    }}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

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
