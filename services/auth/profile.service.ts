import { prisma } from "@/lib/prisma";

export async function getProfile(accountId: bigint) {
  return prisma.accounts.findUnique({
    where: {
      account_id: accountId,
    },
    select: {
      account_id: true,
      email: true,
      role: true,
      created_at: true,
    },
  });
}