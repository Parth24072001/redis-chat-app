import axios from "axios";
import { getItemFromCookie, removeItemInCookie } from "../helpers/utils";

const api = axios.create({
    baseURL: import.meta.env.VITE_APIURL,
    headers: { "Content-type": "application/json" },
});

api.interceptors.request.use(
    async (config) => {
        const accessToken = getItemFromCookie("accessToken");

        if (accessToken) {
            config.headers["Authorization"] = "Bearer " + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            removeItemInCookie("accessToken");
            removeItemInCookie("refreshToken");

            window.location.replace("/login");
        }

        const sentryError = {
            url: `${error.config?.baseURL}${error.config?.url}`,
            message: error.response?.data.message || error.message,
            status: error.response?.status || error.status || "",
            payload: error.config?.data,
        };

        if (typeof sentryError.payload === "string") {
            sentryError.payload = JSON.parse(sentryError.payload);
        }

        return Promise.reject(error);
    }
);

export default api;
