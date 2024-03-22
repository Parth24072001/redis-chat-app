import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Signup } from "../api";

const useSignUp = () => {
    const navigate = useNavigate();
    return useMutation((data) => Signup(data), {
        onSuccess: (response) => {
            toast("Sign up successful!", {
                type: "success",
            });
            navigate("/login");
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

export default useSignUp;
