import { z } from "zod";

export const MemberSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, "Full Name is required"),

  gender: z.string().optional(),

  student_number: z.string().optional(),

  email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),

  phone: z.string().optional(),
});

export type MemberInput =
  z.infer<typeof MemberSchema>;