import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SearchUser } from "../modules/api";

const useSearchUser = (setSearchResult) => {
    return useMutation((search) => SearchUser(search), {
        onSuccess: (response) => {
            setSearchResult(response?.data);
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

export default useSearchUser;
