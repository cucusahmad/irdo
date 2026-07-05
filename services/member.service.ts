import { prisma } from "@/lib/prisma";
import { MemberInput } from "@/validations/member";

async function getParticipantId(accountId: bigint) {
  const participant = await prisma.participant.findUnique({
    where: {
      account_id: accountId,
    },
  });

  if (!participant) {
    throw new Error("PARTICIPANT_NOT_FOUND");
  }

  return participant.participant_id;
}

export async function getMembers(
  accountId: bigint
) {
  const participantId =
    await getParticipantId(accountId);

  return prisma.participant_member.findMany({
    where: {
      participant_id: participantId,
    },
    orderBy: {
      member_id: "asc",
    },
  });
}

export async function createMember(
  accountId: bigint,
  data: MemberInput
) {
  const participantId =
    await getParticipantId(accountId);

  return prisma.participant_member.create({
    data: {
      participant_id: participantId,

      full_name: data.full_name,

      gender: data.gender,

      student_number:
        data.student_number,

      email: data.email,

      phone: data.phone,
    },
  });
}

export async function updateMember(
  accountId: bigint,
  memberId: bigint,
  data: MemberInput
) {
  const participantId =
    await getParticipantId(accountId);

  return prisma.participant_member.update({
    where: {
      member_id: memberId,
    },
    data: {
      participant_id: participantId,

      full_name: data.full_name,

      gender: data.gender,

      student_number:
        data.student_number,

      email: data.email,

      phone: data.phone,
    },
  });
}

export async function deleteMember(
  accountId: bigint,
  memberId: bigint
) {
  await getParticipantId(accountId);

  return prisma.participant_member.delete({
    where: {
      member_id: memberId,
    },
  });
}