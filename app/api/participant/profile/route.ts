import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";
import { serialize } from "@/lib/serializer";

import {
  ParticipantProfileSchema,
} from "@/validations/participant";

import {
  getParticipantProfile,
  saveParticipantProfile,
} from "@/services/participant.service";

export async function GET(
  request: NextRequest
) {
  try {
    const token =
      request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const payload =
      verifyToken(token) as any;

    const participant =
      await getParticipantProfile(
        BigInt(payload.account_id)
      );

    if (!participant) {
      return NextResponse.json({
        success: true,
        data: {
          competition_id: "",

          team_name: "",

          institution_name: "",

          country: "",

          province: "",

          city: "",

          address: "",

          leader_name: "",

          leader_gender: "",

          leader_phone: "",

          leader_student_number: "",
        },
      });
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

export async function PUT(
  request: NextRequest
) {
  try {

    const token =
      request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const payload =
      verifyToken(token) as any;

    const body =
      await request.json();

    const data =
      ParticipantProfileSchema.parse({
        ...body,

        competition_id: Number(
          body.competition_id
        ),
      });

    const participant =
      await saveParticipantProfile(
        BigInt(payload.account_id),
        data
      );

    return NextResponse.json({
      success: true,
      message:
        "Profile saved successfully",
      data: serialize(participant),
    });

  } catch (error: any) {

    console.error(error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message:
            error.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}