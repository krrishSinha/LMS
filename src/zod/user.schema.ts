import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),

  avatar: z
    .object({
      public_id: z.string().optional(),
      url: z.string().url().optional()
    })
    .optional(),

  role: z.enum(["user", "admin"]).optional(), // default: 'user'
  isVerified: z.boolean().optional(),         // default: false

  courses: z
    .array(
      z.object({
        courseId: z.string()
      })
    )
    .optional(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
