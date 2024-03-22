import { useFormik } from "formik";
import { LoginSchema } from "../validation";

export const useLoginForm = (login) => {
  return useFormik({
    initialValues: {
      username: "",
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
