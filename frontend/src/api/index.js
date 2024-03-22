import api from "./apiinetrcepter";

export const rereshToken = (refreshToken) => {
    const data = { refreshToken: refreshToken };
    return api.post(`users/refresh-token`, data);
};
