import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { removeUserInGroup } from "../modules/api";

const useRemoveUserInGroup = (setSelectedChat, userId) => {
    return useMutation((data) => removeUserInGroup(data), {
        onSuccess: (res) => {
            userId === user?.currentUser._id
                ? setSelectedChat()
                : setSelectedChat(res?.data);
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

export default useRemoveUserInGroup;
