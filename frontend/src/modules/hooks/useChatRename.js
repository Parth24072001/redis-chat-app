import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { ChatRename } from "../api";

const useChatRename = (setSelectedChat) => {
    return useMutation((data) => ChatRename(data), {
        onSuccess: (res) => {
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

export default useChatRename;
