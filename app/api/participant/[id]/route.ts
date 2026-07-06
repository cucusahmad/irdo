import { NextRequest, NextResponse } from "next/server";

import { serialize } from "@/lib/serializer";

import { getParticipantDetail } from "@/services/admin.service";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await params;

    const participant =
      await getParticipantDetail(
        BigInt(id)
      );

    if (!participant) {
      return NextResponse.json(
        {
          success: false,
          message: "Participant not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: serialize(participant),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}