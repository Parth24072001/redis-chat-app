import { useFormik } from "formik";
import { SignUpSchema } from "../../validation/validation";

export const useSignUpForm = (signUp) => {
    return useFormik({
        initialValues: {
            name: "",
            fullName: "",
            email: "",
            password: "",
        },
        validationSchema: SignUpSchema,
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: async (values) => {
            await signUp(values);
        },
    });
};
