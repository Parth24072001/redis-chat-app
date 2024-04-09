import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { deleteGroup } from "../api";

const useDeleteGroup = () => {
    return useMutation((id) => deleteGroup(id), {
        onSuccess: (res) => {
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

export default useDeleteGroup;
