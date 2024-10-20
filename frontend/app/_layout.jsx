import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "./context/AuthContext";
import { Slot } from "expo-router";

const RootLayout = () => {
    return (
        <RootSiblingParent>
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </RootSiblingParent>
    );
};

export default RootLayout;
