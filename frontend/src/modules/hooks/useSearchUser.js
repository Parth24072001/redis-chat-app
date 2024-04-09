import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SearchUser } from "../api";

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
            setSearchResult([]);
            console.log(error);
        },
    });
};

export default useSearchUser;
