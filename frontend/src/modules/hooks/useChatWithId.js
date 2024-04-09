import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { ChatWithId } from "../api";

const useChatWithId = (setChats, chats, setSelectedChat) => {
    return useMutation((id) => ChatWithId(id), {
        onSuccess: (res) => {
            if (!chats?.find((c) => c._id === res?.data._id))
                setChats([res?.data, ...chats]);
            setSelectedChat(res?.data);
            return res?.data;
        },
        onError: (error) => {
            toast(error?.response?.data?.message, {
                type: "error",
            });
            console.log(error);
        },
    });
};

export default useChatWithId;
