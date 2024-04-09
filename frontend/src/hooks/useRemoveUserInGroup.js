import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { removeUserInGroup } from "../modules/api";
import { useUser } from "../shared/provider/user-provider/userProvider";

const useRemoveUserInGroup = (setSelectedChat, userId) => {
    const { user } = useUser();
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
