import { connectToDatabase } from "@/lib/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("q") || "";
    const tag = searchParams.get("tag") || "";

    const query: any = { published: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }

    if (tag) {
      query.tags = tag;
    }

    const blogs = await Blog.find(query).sort({ publishedAt: -1 });

    return NextResponse.json({ success: true, count: blogs.length, blogs });
  } catch (error: any) {
    console.error("Fetch blogs error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs", error: error.message || error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { title, content, summary, author, coverImage, tags, readTime, published } = body;

    if (!title || !content || !summary || !coverImage) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing (title, content, summary, coverImage)" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    
    let slug = baseSlug;
    let exists = await Blog.findOne({ slug });
    let counter = 1;
    while (exists) {
      slug = `${baseSlug}-${counter}`;
      exists = await Blog.findOne({ slug });
      counter++;
    }

    const newBlog = await Blog.create({
      title,
      slug,
      content,
      summary,
      author: author || "Apex Horizon Team",
      coverImage,
      tags: tags || [],
      readTime: readTime || "5 min read",
      published: published !== undefined ? published : true,
      publishedAt: new Date()
    });

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error: any) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create blog post", error: error.message || error },
      { status: 500 }
    );
  }
}
