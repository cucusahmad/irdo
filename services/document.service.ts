import { prisma } from "@/lib/prisma";

import { DocumentInput } from "@/validations/document";

async function getParticipantId(
  accountId: bigint
) {
  const participant =
    await prisma.participant.findUnique({
      where: {
        account_id: accountId,
      },
    });

  if (!participant) {
    throw new Error(
      "PARTICIPANT_NOT_FOUND"
    );
  }

  return participant.participant_id;
}

// ===================================
// GET DOCUMENT
// ===================================

export async function getDocuments(
  accountId: bigint
) {
  const participantId =
    await getParticipantId(accountId);

  return prisma.participant_document.findMany({
    where: {
      participant_id: participantId,
    },

    orderBy: {
      created_at: "desc",
    },
  });
}

// ===================================
// CREATE DOCUMENT
// ===================================

export async function createDocument(
  accountId: bigint,
  data: DocumentInput,
  fileName: string,
  filePath: string
) {
  const participantId =
    await getParticipantId(accountId);

  if (
    data.document_type === "PAYMENT"
  ) {
    const payment =
      await prisma.participant_document.findFirst(
        {
          where: {
            participant_id:
              participantId,

            document_type:
              "PAYMENT",
          },
        }
      );

    if (payment) {
      return prisma.participant_document.update({
        where: {
          document_id:
            payment.document_id,
        },

        data: {
          document_title:
            data.document_title,

          file_name: fileName,

          file_path: filePath,
        },
      });
    }
  }

  return prisma.participant_document.create({
    data: {
      participant_id:
        participantId,

      document_type:
        data.document_type,

      document_title:
        data.document_title,

      file_name: fileName,

      file_path: filePath,
    },
  });
}

export async function deleteDocument(
  accountId: bigint,
  documentId: bigint
) {
  const participantId =
    await getParticipantId(accountId);

  const document =
    await prisma.participant_document.findFirst({
      where: {
        document_id: documentId,
        participant_id: participantId,
      },
    });

  if (!document) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }

  return prisma.participant_document.delete({
    where: {
      document_id: documentId,
    },
  });
}