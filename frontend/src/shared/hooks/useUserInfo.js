import { useQuery } from "@tanstack/react-query";
import { me } from "../../apiInetrcepter";

const useUserInfo = () => {
    return useQuery(["get-user"], me, {
        onError: (error) => {
            console.log(error);
        },
    });
};

export default useUserInfo;
