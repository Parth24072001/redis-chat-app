import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { addUserInGroup } from "../api";

const useAddUserInGroup = (setSelectedChat) => {
    return useMutation((data) => addUserInGroup(data), {
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

export default useAddUserInGroup;
