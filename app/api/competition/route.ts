import { getCompetitions } from "@/services/competition.service";
import { serialize } from "@/lib/serializer";
import { success, failed } from "@/lib/response";

export async function GET() {
  try {
    const competitions = await getCompetitions();

    return success(
      serialize(competitions),
      "Competition list retrieved successfully."
    );
  } catch (error) {
    console.error("Competition API Error:", error);

    return failed(
      "Failed to retrieve competition data.",
      500
    );
  }
}