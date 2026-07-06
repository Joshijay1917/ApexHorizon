import { connectToDatabase } from "@/lib/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    const blog = await Blog.findOne({ slug, published: true });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error("Fetch single blog error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog post", error: error.message || error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const body = await request.json();

    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found or failed to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error("Update blog error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update blog post", error: error.message || error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    const blog = await Blog.findOneAndDelete({ slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error: any) {
    console.error("Delete blog error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog post", error: error.message || error },
      { status: 500 }
    );
  }
}
