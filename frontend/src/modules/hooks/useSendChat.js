import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MessageWithUser } from "../api";

const useSendChat = (setMessages, messages, socket) => {
    return useMutation((data) => MessageWithUser(data), {
        onSuccess: (response) => {
            socket.emit("new message", response?.data);
            setMessages([...messages, response?.data]);
            return response;
        },
        onError: (error) => {
            toast(error?.response?.data?.message, {
                type: "error",
            });
            console.log(error);
        },
    });
};

export default useSendChat;
