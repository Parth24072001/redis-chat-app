import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { createGroup } from "../modules/api";

const useCreateGroup = (setChats, chats) => {
    return useMutation((data) => createGroup(data), {
        onSuccess: (res) => {
            setChats([res?.data, ...chats]);

            return res;
        },
        onError: (error) => {
            toast(error?.response?.data?.message, {
                type: "error",
            });
            console.log(error);
        },
    });
};

export default useCreateGroup;
