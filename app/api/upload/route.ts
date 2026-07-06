import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate type (images only)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate size (limit to 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: "File size exceeds the 5MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save path: public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique name
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${timestamp}_${cleanFileName}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${uniqueFileName}`;
    return NextResponse.json(
      { message: "Upload successful", url: relativeUrl },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Internal server error during upload" },
      { status: 500 }
    );
  }
}
