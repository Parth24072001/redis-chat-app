import api from "./apiinetrcepter";

export const rereshToken = (refreshToken) => {
    const data = { refreshToken: refreshToken };
    return api.post(`user/refresh-token`, data);
};

export const me = () => {
    return api.get(`user/me`);
};
