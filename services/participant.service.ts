import { prisma } from "@/lib/prisma";
import { ParticipantProfileInput } from "@/validations/participant";

// ==========================================
// GET PROFILE
// ==========================================

export async function getParticipantProfile(
  accountId: bigint
) {
  return prisma.participant.findUnique({
    where: {
      account_id: accountId,
    },
    include: {
      competition: true,
    },
  });
}

// ==========================================
// UPSERT PROFILE
// ==========================================

export async function saveParticipantProfile(
  accountId: bigint,
  data: ParticipantProfileInput
) {
  return await prisma.participant.upsert({
    where: {
      account_id: accountId,
    },

    update: {
      competition_id: BigInt(data.competition_id),

      team_name: data.team_name,

      institution_name: data.institution_name,

      country: data.country,

      province: data.province,

      city: data.city,

      address: data.address,

      leader_name: data.leader_name,

      leader_gender: data.leader_gender,

      leader_phone: data.leader_phone,

      leader_student_number:
        data.leader_student_number,
    },

    create: {
      account_id: accountId,

      competition_id: BigInt(data.competition_id),

      team_name: data.team_name,

      institution_name: data.institution_name,

      country: data.country,

      province: data.province,

      city: data.city,

      address: data.address,

      leader_name: data.leader_name,

      leader_gender: data.leader_gender,

      leader_phone: data.leader_phone,

      leader_student_number:
        data.leader_student_number,

      registration_status: "PENDING",

      payment_status: "UNPAID",
    },
  });
}