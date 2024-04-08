import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { MessageWithUserId } from "../modules/api";

const useSelectedChat = (id, setMessages) => {
    return useMutation(() => MessageWithUserId(id), {
        onSuccess: (res) => {
            console.log(res?.data);
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
