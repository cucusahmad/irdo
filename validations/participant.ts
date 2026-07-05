import { z } from "zod";

export const ParticipantProfileSchema = z.object({
  competition_id: z.number(),

  team_name: z.string().min(3),

  institution_name: z.string().min(3),

  country: z.string().optional(),

  province: z.string().optional(),

  city: z.string().optional(),

  address: z.string().optional(),

  leader_name: z.string().min(3),

  leader_gender: z.string().optional(),

  leader_phone: z.string().min(8),

  leader_student_number: z.string().optional(),
});

export type ParticipantProfileInput =
  z.infer<typeof ParticipantProfileSchema>;