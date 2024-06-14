// _layout is the root template present in all screens of the app

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
    );
};

export default RootLayout;
