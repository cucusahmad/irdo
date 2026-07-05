import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";

import { verifyToken } from "@/lib/jwt";
import { serialize } from "@/lib/serializer";

import {
  DocumentSchema,
} from "@/validations/document";

import {
  getDocuments,
  createDocument,
} from "@/services/document.service";

import { ZodError } from "zod";

// ========================================
// GET
// ========================================

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
        },
        {
          status: 401,
        }
      );
    }

    const payload =
      verifyToken(token) as any;

    const documents =
      await getDocuments(
        BigInt(payload.account_id)
      );

    return NextResponse.json({
      success: true,
      data: serialize(documents),
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

// ========================================
// POST
// ========================================

export async function POST(
  request: NextRequest
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

    const formData =
      await request.formData();

    const file =
      formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message:
            "File is required",
        },
        {
          status: 400,
        }
      );
    }

    const data =
      DocumentSchema.parse({
        document_type:
          formData.get(
            "document_type"
          ),

        document_title:
          formData.get(
            "document_title"
          ),
      });

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const uploadDir =
      path.join(
        process.cwd(),
        "public",
        "uploads"
      );

    if (
      !fs.existsSync(uploadDir)
    ) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const filename =
      `${Date.now()}_${file.name}`;

    const filepath =
      path.join(
        uploadDir,
        filename
      );

    fs.writeFileSync(
      filepath,
      buffer
    );

    const document =
      await createDocument(
        BigInt(payload.account_id),

        data,

        filename,

        `/uploads/${filename}`
      );

    return NextResponse.json({
      success: true,

      message:
        "Document uploaded successfully.",

      data: serialize(document),
    });

  } catch (error: any) {

    console.error(error);

    if (
      error instanceof ZodError
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            error.issues[0]
              ?.message,
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