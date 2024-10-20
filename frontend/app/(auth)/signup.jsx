import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input, Button } from "react-native-elements";
import { Link, router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { BACKEND_BASE_URL } from "@env";
import axios from "axios";
import Toast from "react-native-root-toast";

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(
                `${BACKEND_BASE_URL}/user/create`,
                form
            );
            console.log("auth-signup User created:", response.data);

            Toast.show("User registered successfully. Please log in", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });

            setTimeout(() => {
                router.push("login");
            }, 2000);
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail || "Error registering user";
            Toast.show(errorMessage, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.headerText}>Sign Up</Text>
                <Input
                    placeholder="First Name"
                    leftIcon={<Icon name="user" size={24} color="black" />}
                    value={form.first_name}
                    onChangeText={(first_name) =>
                        setForm({ ...form, first_name })
                    }
                    containerStyle={styles.inputContainer}
                />
                <Input
                    placeholder="Last Name"
                    leftIcon={<Icon name="user" size={24} color="black" />}
                    value={form.last_name}
                    onChangeText={(last_name) =>
                        setForm({ ...form, last_name })
                    }
                    containerStyle={styles.inputContainer}
                />
                <Input
                    placeholder="Username"
                    leftIcon={<Icon name="user" size={24} color="black" />}
                    value={form.username}
                    onChangeText={(username) => setForm({ ...form, username })}
                    containerStyle={styles.inputContainer}
                    autoCapitalize="none"
                />
                <Input
                    placeholder="Email"
                    leftIcon={<Icon name="envelope" size={24} color="black" />}
                    value={form.email}
                    onChangeText={(email) => setForm({ ...form, email })}
                    keyboardType="email-address"
                    containerStyle={styles.inputContainer}
                    autoCapitalize="none"
                />
                <Input
                    placeholder="Password"
                    leftIcon={<Icon name="lock" size={24} color="black" />}
                    value={form.password}
                    onChangeText={(password) => setForm({ ...form, password })}
                    secureTextEntry
                    containerStyle={styles.inputContainer}
                    autoCapitalize="none"
                />
                <Button
                    title="SignUp"
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.signupButton}
                />
                <View style={styles.signinTextContainer}>
                    <Text>Already have an account? </Text>
                    <Link href="login">
                        <Text style={styles.signinLink}>Sign in</Text>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;

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
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    inputContainer: {
        width: "100%",
        marginVertical: 10,
    },
    buttonContainer: {
        width: "100%",
        marginVertical: 10,
    },
    signupButton: {
        backgroundColor: "blue",
    },
    signinTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    signinLink: {
        color: "blue",
        fontWeight: "bold",
    },
});
