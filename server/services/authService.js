import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "devgpt-secret";

export async function registerUser({ name, email, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return { user: { _id: user._id, name: user.name, email: user.email }, token };
}

export async function loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return { user: { _id: user._id, name: user.name, email: user.email }, token };
}
