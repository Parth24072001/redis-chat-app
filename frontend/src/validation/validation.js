import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    fullName: Yup.string().required("fullName is required."),
    email: Yup.string().required("email is required."),
    password: Yup.string().required("Password is required."),
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string().required("Password is required."),
});
