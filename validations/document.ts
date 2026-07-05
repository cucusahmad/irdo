import { z } from "zod";

export const DocumentSchema = z.object({
  document_type: z.enum([
    "PAYMENT",
    "ADDITIONAL",
  ]),

  document_title: z
    .string()
    .trim()
    .min(3, "Document Title is required"),
});

export type DocumentInput =
  z.infer<typeof DocumentSchema>;