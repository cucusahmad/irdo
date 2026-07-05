import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";
import { serialize } from "@/lib/serializer";

import {
  getRegistrationStatus,
} from "@/services/status.service";

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

    const result =
      await getRegistrationStatus(
        BigInt(payload.account_id)
      );

    return NextResponse.json({
      success: true,
      data: serialize(result),
    });

  } catch (error) {
    console.error(error);

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