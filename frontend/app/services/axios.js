import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
