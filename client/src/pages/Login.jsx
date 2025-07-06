import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { loginSchema } from "../validation/loginSchema";
import useAuth from "../hooks/useAuth";
import GitHubLoginButton from "../components/GitHubLoginButton";
import PasswordField from "../components/PasswordField";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const initialValues = {
        email: "",
        password: "",
    };

    const handleLogin = async (values, actions) => {
        const result = await login(values);
        if (result.success) {
            actions.setSubmitting(false);
            navigate("/dashboard");
        } else {
            actions.setFieldError("email", result.message || "Invalid credentials");
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-100 to-violet-100 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full z-0" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-400/20 blur-[100px] rounded-full z-0" />

            <motion.div
                className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 md:p-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* LEFT: Login Form */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-3xl font-bold gap-2">
                        <LogIn size={28} />
                        Login to DevGPT
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={toFormikValidationSchema(loginSchema)}
                        onSubmit={handleLogin}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">
                                <div>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white transition duration-300"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <PasswordField name="password" placeholder="••••••••" /> {/* 👈 Eye toggle */}

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300"
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </motion.button>
                            </Form>
                        )}
                    </Formik>

                    <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                        >
                            Register
                        </Link>
                    </div>
                </div>

                {/* RIGHT: GitHub Login Card */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-inner">
                    <div className="text-center space-y-4">
                        <div className="text-gray-700 dark:text-gray-200 text-lg font-semibold">
                            Prefer a faster login?
                        </div>
                        <GitHubLoginButton label="Login with GitHub" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Securely connects via OAuth
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Want to review private repos? Login with GitHub to grant secure access.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
