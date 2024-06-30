// _layout is the root template present in all screens of the app

import { Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "./context/JWTAuthContext";

const RootLayout = () => {
    return (
        <RootSiblingParent>
            <AuthProvider>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="(auth)"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </AuthProvider>
        </RootSiblingParent>
    );
};

export default RootLayout;
