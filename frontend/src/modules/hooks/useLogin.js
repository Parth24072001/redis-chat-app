import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Login } from "../api";
import { setItemInCookie } from "../../shared/helpers/utils";

const useLogin = () => {
    const navigate = useNavigate();
    return useMutation((data) => Login(data), {
        onSuccess: (response) => {
            setItemInCookie(
                "accessToken",
                `${response?.data?.data?.accessToken}`
            );
            setItemInCookie(
                "refreshToken",
                `${response?.data?.data?.refreshToken}`
            );

            localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data?.data?.user)
            );

            navigate("/");
            return response;
        },
        onError: (error) => {
            toast("Something Went Wrong", {
                type: "error",
            });
            console.log(error);
        },
    });
};

export default useLogin;
