import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({ name, placeholder }) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <Field
                type={show ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-white transition duration-300"
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                aria-label="Toggle password visibility"
            >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
}
