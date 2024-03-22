import axios from "axios";
import { getItemFromCookie, removeItemInCookie } from "../helpers/utils";
import { ACCESSTOKEN } from "../helpers/constant";

const api = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { "Content-type": "application/json" },
});

api.interceptors.request.use(
    async (config) => {
        const accessToken = getItemFromCookie(ACCESSTOKEN);

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

            // Redirect to login page
            window.location.replace("/login");
        }

        // Forward the error for further processing
        return Promise.reject(error);
    }
);

export default api;
