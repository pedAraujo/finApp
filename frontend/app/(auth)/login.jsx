import { useContext, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input, Button } from "react-native-elements";
import { Link, router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../context/JWTAuthContext";
import Toast from "react-native-root-toast";

const Login = () => {
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            console.log("handlesumit - Submitting login form with:", form);
            await login(form.email, form.password);
            router.push("pluggy");
        } catch (error) {
            Toast.show(`${error}`, {
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
                <Text style={styles.headerText}>Login</Text>
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
                    title="Login"
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.loginButton}
                />
                <Text style={styles.signupText}>
                    Don't have an account?{" "}
                    <Link href="signup">
                        <Text style={styles.signupLink}>Sign up</Text>
                    </Link>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;

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
    loginButton: {
        backgroundColor: "blue",
    },
    signupText: {
        marginTop: 20,
        textAlign: "center",
    },
    signupLink: {
        color: "blue",
        fontWeight: "bold",
    },
});
