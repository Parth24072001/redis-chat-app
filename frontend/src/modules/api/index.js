import api from "../../shared/api/apiinetrcepter";

export const Signup = (data) => {
    return api.post(`user/signup`, data);
};
export const Login = (data) => {
    return api.post(`user/login`, data);
};
export const me = () => {
    return api.get(`users/current-user`);
};

export const Chat = (data) => {
    return api.get(`chat`, data);
};
export const GroupChat = (data) => {
    return api.post(`chat/group`, data);
};

export const SearchUser = (search) => {
    return api.post(`user?search=${search}`);
};

export const ChatWithId = (id) => {
    return api.post(`chat`, id);
};
export const MessageWithUserId = (id) => {
    return api.get(`/message/${id}`);
};
export const MessageWithUser = (data) => {
    return api.post(`/message`, data);
};
