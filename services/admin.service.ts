import { prisma } from "@/lib/prisma";

interface GetParticipantsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  competition?: number;
}

export async function getParticipants({
  page = 1,
  limit = 10,
  search = "",
  status,
  competition,
}: GetParticipantsParams) {

  const skip = (page - 1) * limit;

  const where: any = {};

  // ===========================
  // SEARCH
  // ===========================

  if (search) {
    where.OR = [
      {
        registration_number: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        team_name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        institution_name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        leader_name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        leader_phone: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // ===========================
  // STATUS
  // ===========================

  if (status) {
    where.registration_status = status;
  }

  // ===========================
  // COMPETITION
  // ===========================

  if (competition) {
    where.competition_id = BigInt(competition);
  }

  const total = await prisma.participant.count({
    where,
  });

  const participants =
    await prisma.participant.findMany({

      where,

      include: {
        competition: true,

        _count: {
          select: {
            participant_member: true,
            participant_document: true,
          },
        },
      },

      orderBy: {
        created_at: "desc",
      },

      skip,

      take: limit,
    });

  return {
    data: participants,

    pagination: {

      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),

    },
  };
}

export async function getParticipantDetail(
  participantId: bigint
) {
  return prisma.participant.findUnique({
    where: {
      participant_id: participantId,
    },

    include: {
      competition: true,

      participant_member: true,

      participant_document: true,

      accounts: {
        select: {
          email: true,
        },
      },
    },
  });
}

export async function reviewParticipant(
  participantId: bigint,
  registration_status:
    | "APPROVED"
    | "REJECTED",
  notes: string
) {
  return prisma.participant.update({
    where: {
      participant_id: participantId,
    },
    data: {
      registration_status,
      notes,
    },
  });
}