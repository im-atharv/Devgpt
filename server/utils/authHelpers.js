import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => await bcrypt.hash(password, 10);

export const comparePassword = async (password, hash) => await bcrypt.compare(password, hash);

export const generateToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
