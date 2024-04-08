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
export const ChatRename = (data) => {
    return api.put(`chat/rename`, data);
};

export const GroupAdd = (data) => {
    return api.put(`chat/groupadd`, data);
};
export const GroupRemove = (data) => {
    return api.put(`chat/groupremove`, data);
};

export const ChatWithId = (id) => {
    return api.post(`chat`, id);
};
export const MessageWithUserId = (id) => {
    console.log(id);
    return api.get(`/message/${id}`);
};
export const MessageWithUser = (data) => {
    return api.post(`/message`, data);
};

export const createGroup = (data) => {
    return api.post(`/chat/group`, data);
};

export const addUserInGroup = (data) => {
    return api.put(`/chat/groupadd`, data);
};

export const removeUserInGroup = (data) => {
    return api.put(`/chat/groupremove`, data);
};
export const deleteGroup = (groupId) => {
    return api.delete(`/chat/groupdelete/${groupId}`);
};
