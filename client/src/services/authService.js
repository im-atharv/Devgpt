// services/authService.js
import axiosInstance from "./axiosInstance";
export const registerUser = async (formData) => {
    try {
        const res = await axiosInstance.post("/auth/register", formData);
        return res.data;
    } catch (error) {
        console.error("❌ Registration error:", error?.response?.data || error.message);
        throw error?.response?.data || { message: "Registration failed. Try again." };
    }
};

export const loginUser = async (formData) => {
    try {
        const res = await axiosInstance.post("/auth/login", formData);
        return res.data;
    } catch (error) {
        console.error("❌ Login error:", error?.response?.data || error.message);
        throw error?.response?.data || { message: "Login failed. Check your credentials." };
    }
};
