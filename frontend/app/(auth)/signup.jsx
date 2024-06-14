import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
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
                    <Text>Sign Up</Text>
                </View>
                <FormField
                    title="Username"
                    value={form.username}
                    handleChangeText={(event) =>
                        setForm({ ...form, username: event })
                    }
                    otherStyles={{ marginTop: 7 }}
                />
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
                    title="SignUp"
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
                    <Text>Already have an account?</Text>
                    <Link href="login">Sign in</Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
