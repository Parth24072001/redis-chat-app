import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Chat } from "../api";

const useGetChats = () => {
    return useQuery(["chats"], () => Chat(), {
        select: (res) => {
            return res?.data;
        },
        onError: () => {
            toast("data not found", { type: "error" });

            return;
        },
    });
};

export default useGetChats;
