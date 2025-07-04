// pages/GitHubAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

            loginWithGitHub(token, user); // use the AuthContext method

            // Redirect to PR dashboard or home
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg font-medium">Processing GitHub login...</p>
        </div>
    );
}
