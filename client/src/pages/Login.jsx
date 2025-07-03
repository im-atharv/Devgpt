// pages/Login.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { loginSchema } from "../validation/loginSchema";
import useAuth from "../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); // ✅ use login from context

    const initialValues = {
        email: "",
        password: "",
    };

    const handleLogin = async (values, actions) => {
        const result = await login(values); // ✅ context login()

        if (result.success) {
            actions.setSubmitting(false);
            navigate("/dashboard"); // ✅ redirect after successful login
        } else {
            actions.setFieldError("email", result.message || "Invalid credentials");
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center px-4">
            <motion.div
                className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl font-bold gap-2">
                    <LogIn size={28} />
                    Login to DevGPT
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={toFormikValidationSchema(loginSchema)}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition"
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 dark:text-blue-400 underline">
                        Register
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
