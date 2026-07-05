import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";
import { serialize } from "@/lib/serializer";

import {
  MemberSchema,
} from "@/validations/member";

import {
  getMembers,
  createMember,
} from "@/services/member.service";

import { ZodError } from "zod";

export async function GET(
  request: NextRequest
) {
  try {
    const token =
      request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const payload =
      verifyToken(token) as any;

    const members =
      await getMembers(
        BigInt(payload.account_id)
      );

    return NextResponse.json({
      success: true,
      data: serialize(members),
    });

  } catch (error) {
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

export async function POST(
  request: NextRequest
) {
  try {
    const token =
      request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const payload =
      verifyToken(token) as any;

    const body =
      await request.json();

    const data =
      MemberSchema.parse(body);

    const member =
      await createMember(
        BigInt(payload.account_id),
        data
      );

    return NextResponse.json({
      success: true,
      message:
        "Member created successfully.",
      data: serialize(member),
    });

  } catch (error: any) {

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.issues[0]?.message,
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