import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext.jsx";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const ProtectedRoute = ({ children }) => {
    const { isLoading, userToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!userToken) {
            router.push("/(auth)/login");
        }
    }, [userToken]);

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!userToken) {
        return null;
    }

    return children;
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
