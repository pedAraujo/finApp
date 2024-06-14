//index is the Home page of the app

import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import { Redirect, router } from "expo-router";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text>FinApp!</Text>
                <CustomButton
                    title="Login"
                    handlePress={() => router.push("login")}
                    containerStyles={{
                        backgroundColor: "blue",
                        padding: 10,
                        borderRadius: 5,
                    }}
                    textStyles={{ color: "white" }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
