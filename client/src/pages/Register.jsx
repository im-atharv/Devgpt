import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { registerSchema } from "../validation/registerSchema";
import { registerUser } from "../services/authService";
import GitHubLoginButton from "../components/GitHubLoginButton";

export default function Register() {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const handleRegister = async (values, actions) => {
        try {
            const res = await registerUser(values);
            console.log("✅ Registration Success:", res);

            actions.setSubmitting(false);
            navigate("/login"); // Redirect after success
        } catch (err) {
            console.error("❌ Registration Error:", err);
            actions.setFieldError("email", "Registration failed. Try again.");
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
                    <UserPlus size={28} />
                    Create Your Account
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={toFormikValidationSchema(registerSchema)}
                    onSubmit={handleRegister}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

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
                                    placeholder="Password"
                                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition"
                            >
                                {isSubmitting ? "Creating account..." : "Register"}
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
                </div>
                <GitHubLoginButton label="Register with GitHub" />


                <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 dark:text-blue-400 underline">
                        Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
