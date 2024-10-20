import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const pluggyApiKey = await SecureStore.getItemAsync("PLUGGY_API_KEY");
        if (pluggyApiKey) {
            config.headers["X-API-KEY"] = pluggyApiKey;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
