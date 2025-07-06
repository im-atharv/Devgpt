import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function GitHubAuthSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginWithGitHub } = useAuth();

    useEffect(() => {
        const token = searchParams.get("token");
        const name = searchParams.get("name");
        const email = searchParams.get("email");

        if (token && name) {
            const user = { name, email: email || "" };
            loginWithGitHub(token, user);
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-950 dark:to-gray-900 px-4">
            <motion.div
                className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Loader2 className="animate-spin text-blue-600 dark:text-blue-400 mb-4" size={40} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Logging you in with GitHub...
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Please wait while we process your authentication.
                </p>
            </motion.div>
        </div>
    );
}
