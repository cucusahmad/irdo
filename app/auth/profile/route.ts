import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { serialize } from "@/lib/serializer";
import { getProfile } from "@/services/auth/profile.service";


export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

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

    const payload = verifyToken(token) as any;

    const account = await getProfile(
      BigInt(payload.account_id)
    );

    return NextResponse.json({
      success: true,
      data: serialize(account),
    });
  } catch (error) {
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
}