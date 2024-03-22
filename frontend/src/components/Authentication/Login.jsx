import { useState } from "react";
import axios from "axios";
// import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { setItemInCookie } from "../../shared/helpers/utils";
import { useNavigate } from "react-router-dom";
import api from "../../shared/api/apiinetrcepter";

const Login = () => {
    // const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/user/login",
                values
            );

            localStorage.setItem("userInfo", JSON.stringify(data));
            // queryClient.setQueryData("userInfo", data);
            setLoading(false);
            setItemInCookie("accessToken", `${data?.data?.accessToken}`);
            setItemInCookie("refreshToken", `${data?.data?.refreshToken}`);
            navigate("/chatpage");
        } catch (error) {
            console.error("Login Error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
                        errors.email = "Invalid email address";
                    }
                    if (!values.password) {
                        errors.password = "Required";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleLogin(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700"
                            >
                                Email Address
                            </label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700"
                            >
                                Password
                            </label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            disabled={isSubmitting}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
