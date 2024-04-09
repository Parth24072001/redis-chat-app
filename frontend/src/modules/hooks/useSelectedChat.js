import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { MessageWithUserId } from "../api";

const useSelectedChat = (id, setMessages) => {
    return useMutation(() => MessageWithUserId(id), {
        onSuccess: (res) => {
            setMessages(res?.data);
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

export default useSelectedChat;
