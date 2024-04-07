import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Chat } from "../modules/api";

const useGetChats = (setChats) => {
    return useQuery(["chats"], () => Chat(), {
        select: (res) => {
            setChats(res?.data);
            return res?.data;
        },
        onError: () => {
            toast("data not found", { type: "error" });

            return;
        },
    });
};

export default useGetChats;
