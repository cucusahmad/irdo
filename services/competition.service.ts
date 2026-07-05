import { prisma } from "@/lib/prisma";

export async function getCompetitions() {
  return await prisma.competition.findMany({
    where: {
      is_active: true,
    },
    orderBy: {
      competition_name: "asc",
    },
  });
}