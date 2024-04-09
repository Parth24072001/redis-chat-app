import { useFormik } from "formik";
import { LoginSchema } from "../../validation/validation";

export const useLoginForm = (login) => {
    return useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: async (values) => {
            await login(values);
        },
    });
};
