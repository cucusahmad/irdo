import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

import { serialize } from "@/lib/serializer";

import {
  MemberSchema,
} from "@/validations/member";

import {
  updateMember,
  deleteMember,
} from "@/services/member.service";

import { ZodError } from "zod";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const token =
      request.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json(
        {},
        { status: 401 }
      );

    const payload =
      verifyToken(token) as any;

    const { id } =
      await params;

    const body =
      await request.json();

    const data =
      MemberSchema.parse(body);

    const member =
      await updateMember(
        BigInt(payload.account_id),
        BigInt(id),
        data
      );

    return NextResponse.json({
      success: true,
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

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {

    const token =
      request.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json(
        {},
        { status: 401 }
      );

    const payload =
      verifyToken(token) as any;

    const { id } =
      await params;

    await deleteMember(
      BigInt(payload.account_id),
      BigInt(id)
    );

    return NextResponse.json({
      success: true,
      message:
        "Member deleted successfully.",
    });

  } catch {

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