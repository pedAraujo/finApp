import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { PluggyConnect } from "react-native-pluggy-connect";

const MY_CONNECT_TOKEN_API_URL = "http://127.0.0.1:8000/pluggy-connect-token";

export default function App() {
    const [token, setToken] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchToken() {
            try {
                const response = await fetch(MY_CONNECT_TOKEN_API_URL, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        options: {
                            clientUserId: "p3d.araujo@gmail.com",
                        },
                    }),
                });

                const responseJson = await response.json();

                if (response.ok) {
                    console.log(responseJson);
                    const { accessToken } = responseJson;
                    setToken(accessToken);
                } else {
                    setError(responseJson);
                }
            } catch (error) {
                setError({ message: error.message });
            }
        }

        fetchToken();
    }, []);

    const handleOnOpen = useCallback(() => {
        console.log("open");
    }, []);

    // const handleOnSuccess = useCallback((itemData) => {
    //     console.log("success", itemData);
    // }, []);
    const handleOnSuccess = useCallback(async (itemData) => {
        console.log("success", itemData);
        try {
            const response = await fetch(SEND_ITEM_DATA_API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemData),
            });

            if (response.ok) {
                const { categoryBalances, startDate } = await response.json();
                console.log("Report data", { categoryBalances, startDate });
                setToken(""); // Close the widget
            } else {
                throw new Error("Failed to send item data");
            }
        } catch (error) {
            console.error("Error sending item data", error);
        }
    }, []);

    const handleOnError = useCallback((error) => {
        console.log("error", error);
    }, []);

    const handleOnClose = useCallback(() => {
        setToken("");
    }, []);

    if (error) {
        // error screen
        return (
            <View style={styles.container}>
                <Text>There was an error</Text>
                <Text>{JSON.stringify(error, null, 2)}</Text>
                <StatusBar style="auto" />
            </View>
        );
    }

    if (!token) {
        // loading screen
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <StatusBar style="auto" />
            </View>
        );
    }

    // authenticated! -> render PluggyConnect screen
    return (
        <PluggyConnect
            connectToken={token}
            includeSandbox={true}
            onOpen={handleOnOpen}
            onClose={handleOnClose}
            onSuccess={handleOnSuccess}
            onError={handleOnError}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
