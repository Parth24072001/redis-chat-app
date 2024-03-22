import api from "../../shared/api/apiinetrcepter";

export const Signup = (data) => {
    return api.post(`users/register`, data);
};
export const Login = (data) => {
    return api.post(`user/login`, data);
};
export const me = () => {
    return api.get(`users/current-user`);
};
