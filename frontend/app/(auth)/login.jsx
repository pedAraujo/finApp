import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const submit = () => {};
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <Text>Login</Text>
                </View>
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(event) =>
                        setForm({ ...form, email: event })
                    }
                    otherStyles={{ marginTop: 7 }}
                    keyboardType="email-address"
                />
                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(event) =>
                        setForm({ ...form, password: event })
                    }
                    otherStyles={{ marginTop: 7 }}
                />
                <CustomButton
                    title="Login"
                    handlePress={submit}
                    containerStyles={{
                        backgroundColor: "blue",
                        padding: 10,
                        borderRadius: 5,
                    }}
                    textStyles={{ color: "white" }}
                    isLoading={isSubmitting}
                />
                <View>
                    <Text>Don't have an account?</Text>
                    <Link href="signup">Sign up</Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
