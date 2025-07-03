// validation/registerSchema.js
import { z } from "zod";

export const registerSchema = z
    .object({
        name: z.string().min(2, "Name is too short."),
        email: z.string().email("Enter a valid email."),
        password: z.string().min(6, "Password must be at least 6 characters."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });
