import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

import { deleteDocument } from "@/services/document.service";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {

    const token =
      request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {},
        {
          status: 401,
        }
      );
    }

    const payload =
      verifyToken(token) as any;

    const { id } =
      await params;

    await deleteDocument(
      BigInt(payload.account_id),
      BigInt(id)
    );

    return NextResponse.json({
      success: true,
      message: "Deleted",
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