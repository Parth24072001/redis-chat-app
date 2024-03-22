import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
    username: Yup.string().required("User id required."),
    fullName: Yup.string().required("fullName is required."),
    email: Yup.string().required("email is required."),
    password: Yup.string().required("Password is required."),
});

export const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required."),
});
