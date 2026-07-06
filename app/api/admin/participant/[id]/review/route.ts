import { NextRequest, NextResponse } from "next/server";

import { reviewParticipant } from "@/services/admin.service";

export async function PUT(
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

    const body = await request.json();

    await reviewParticipant(
      BigInt(id),
      body.registration_status,
      body.notes ?? ""
    );

    return NextResponse.json({
      success: true,
      message: "Participant updated successfully",
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