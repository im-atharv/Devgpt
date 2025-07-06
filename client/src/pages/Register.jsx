import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { registerSchema } from "../validation/registerSchema";
import { registerUser } from "../services/authService";
import GitHubLoginButton from "../components/GitHubLoginButton";
import PasswordField from "../components/PasswordField"; // ✅ import

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
            actions.setSubmitting(false);
            navigate("/login");
        } catch (err) {
            actions.setFieldError("email", "Registration failed. Try again.");
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-violet-100 to-blue-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
            {/* Glowing Blobs */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full z-0" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-400/20 blur-[100px] rounded-full z-0" />

            {/* Card */}
            <motion.div
                className="relative z-10 w-full max-w-4xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Left: Register Form */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-2xl font-bold gap-2">
                        <UserPlus size={24} />
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
                                        className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <PasswordField name="password" placeholder="Password" /> {/* ✅ updated */}
                                <PasswordField name="confirmPassword" placeholder="Confirm Password" /> {/* ✅ updated */}

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300"
                                >
                                    {isSubmitting ? "Creating account..." : "Register"}
                                </motion.button>
                            </Form>
                        )}
                    </Formik>

                    <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 dark:text-blue-400 underline">
                            Login
                        </Link>
                    </div>
                </div>

                {/* Right: GitHub CTA */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 shadow-inner backdrop-blur-sm">
                    <div className="text-center space-y-5">
                        <div className="text-gray-800 dark:text-white text-xl font-bold">
                            Prefer a Faster Way?
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            Register using your GitHub account to unlock full functionality — including support for private repositories.
                        </p>
                        <GitHubLoginButton label="Register with GitHub" />
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            OAuth-secured · No passwords stored
                        </div>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3">
                                Or
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Want to review <strong>private PRs</strong>? GitHub login is required for repository access and secure authentication.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
