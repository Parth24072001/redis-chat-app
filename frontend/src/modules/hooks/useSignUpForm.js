import { useFormik } from "formik";
import { SignUpSchema } from "../validation";

export const useSignUpForm = (signUp) => {
  return useFormik({
    initialValues: {
      username: "",
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
