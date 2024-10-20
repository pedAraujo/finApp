import { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const token = await SecureStore.getItemAsync("token");
            if (token) {
                setUserToken({ token });
            }
            setIsLoading(false);
        };
        loadUser();
    }, []);

    const login = async () => {
        const token = "TEST_TOKEN";
        console.log("authContext - login - token:", token);
        setIsLoading(true);
        try {
            await SecureStore.setItemAsync("token", token);
            setUserToken({ token });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await SecureStore.deleteItemAsync("token");
            setUserToken(null);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
