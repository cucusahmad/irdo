import { prisma } from "@/lib/prisma";

async function getParticipant(accountId: bigint) {
  const participant = await prisma.participant.findUnique({
    where: {
      account_id: accountId,
    },
    include: {
      competition: true,
      participant_member: true,
      participant_document: true,
    },
  });

  if (!participant) {
    throw new Error("PARTICIPANT_NOT_FOUND");
  }

  return participant;
}

export async function getRegistrationStatus(
  accountId: bigint
) {
  const participant =
    await getParticipant(accountId);

  const memberCount =
    participant.participant_member.length;

  const payment =
    participant.participant_document.find(
      (doc) =>
        doc.document_type === "PAYMENT"
    );

  const additionalDocuments =
    participant.participant_document.filter(
      (doc) =>
        doc.document_type ===
        "ADDITIONAL"
    ).length;

  const profileCompleted = Boolean(
    participant.competition_id &&
      participant.team_name &&
      participant.institution_name &&
      participant.leader_name &&
      participant.leader_gender &&
      participant.leader_phone
  );

  const paymentRequired =
    Number(
      participant.competition
        ?.registration_fee ?? 0
    ) > 0;

  const paymentCompleted =
    paymentRequired
      ? Boolean(payment)
      : true;

  let progress = 0;

  if (profileCompleted) progress += 50;

  if (paymentCompleted) progress += 50;

  return {
    participant_id:
      participant.participant_id,

    registration_number:
      participant.registration_number,

    registration_status:
      participant.registration_status,

    payment_status:
      participant.payment_status,

    competition:
      participant.competition,

    profile_completed:
      profileCompleted,

    team_count: memberCount,

    payment_required:
      paymentRequired,

    payment_uploaded:
      Boolean(payment),

    additional_documents:
      additionalDocuments,

    progress,

    created_at:
      participant.created_at,

    updated_at:
      participant.updated_at,
  };
}