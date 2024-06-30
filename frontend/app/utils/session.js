import axiosInstance from "../services/axios";
import * as SecureStore from "expo-secure-store";

export const setSession = async (access_token, refresh_token) => {
    if (access_token) {
        await SecureStore.setItemAsync("access_token", access_token);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
        await SecureStore.deleteItemAsync("access_token");
        delete axiosInstance.defaults.headers.common.Authorization;
    }

    if (refresh_token) {
        await SecureStore.setItemAsync("refresh_token", refresh_token);
    } else {
        await SecureStore.deleteItemAsync("refresh_token");
    }
};

export const resetSession = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    delete axiosInstance.defaults.headers.common.Authorization;
};
