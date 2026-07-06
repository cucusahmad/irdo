import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

import { serialize } from "@/lib/serializer";

import {
  getParticipants,
} from "@/services/admin.service";

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

    if (payload.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const { searchParams } =
      new URL(request.url);

    const page = Number(
      searchParams.get("page") ?? 1
    );

    const limit = Number(
      searchParams.get("limit") ?? 10
    );

    const search =
      searchParams.get("search") ?? "";

    const status =
      searchParams.get("status") ??
      undefined;

    const competition =
      searchParams.get("competition");

    const result =
      await getParticipants({

        page,

        limit,

        search,

        status,

        competition: competition
          ? Number(competition)
          : undefined,

      });

    return NextResponse.json({

      success: true,

      data: serialize(result.data),

      pagination:
        result.pagination,

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