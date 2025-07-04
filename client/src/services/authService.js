// services/authService.js
import axiosInstance from "./axiosInstance";

// 🔐 Register via form
export const registerUser = async (formData) => {
    try {
        const res = await axiosInstance.post("/auth/register", formData);
        return res.data;
    } catch (error) {
        console.error("❌ Registration error:", error?.response?.data || error.message);
        throw error?.response?.data || { message: "Registration failed. Try again." };
    }
};

// 🔐 Login via form
export const loginUser = async (formData) => {
    try {
        const res = await axiosInstance.post("/auth/login", formData);
        return res.data;
    } catch (error) {
        console.error("❌ Login error:", error?.response?.data || error.message);
        throw error?.response?.data || { message: "Login failed. Check your credentials." };
    }
};

// 🔐 Login via GitHub OAuth (redirect flow)
export const initiateGitHubLogin = () => {
    // Will trigger backend GitHub OAuth flow
    window.location.href = "http://localhost:5000/api/auth/github";
};
