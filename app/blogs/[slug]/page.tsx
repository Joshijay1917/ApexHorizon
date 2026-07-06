import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { connectToDatabase } from "@/lib/database";
import Blog from "@/models/blog";
import ShareButtons from "@/components/blogs/ShareButtons";
import { connection } from "next/server";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string) {
  try {
    await connectToDatabase();
    const blog = await Blog.findOne({ slug, published: true }).lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Apex Horizon",
    };
  }

  return {
    title: `${blog.title} | Apex Horizon Blog`,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      url: `https://apexhorizon.dev/blogs/${blog.slug}`,
      siteName: "Apex Horizon",
      type: "article",
      publishedTime: blog.publishedAt || blog.createdAt,
      authors: [blog.author],
      images: [
        {
          url: blog.coverImage || "/logo.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: [blog.coverImage || "/logo.png"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  await connection();
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    notFound();
  }

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans flex flex-col selection:bg-blue-200">
      <Navbar />

      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden flex-1">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors mb-10 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Articles
          </Link>

          {/* Article Header */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags && blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight leading-tight mb-8">
              {blog.title}
            </h1>

            {/* Author and Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-b border-zinc-100 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-black uppercase">
                  <Image src={'/logoforlightheme.png'} alt={'logo'} width={45} height={45} className="rounded-full"/>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-800 leading-none mb-1">{blog.author}</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Author</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-zinc-500">
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-700 leading-none mb-1">{formatDate(blog.publishedAt || blog.createdAt)}</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Published</span>
                </div>
                <div className="w-[1px] h-8 bg-zinc-200" />
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-700 leading-none mb-1">{blog.readTime}</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Read Time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-md border border-zinc-200 mb-12">
            <Image
              src={blog.coverImage || "/dashboard.png"}
              alt={blog.title}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Article Excerpt / Summary Box */}
          <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-3xl mb-12 shadow-inner">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3">Key Takeaway Summary</h3>
            <p className="text-zinc-700 font-medium text-lg leading-relaxed">{blog.summary}</p>
          </div>

          {/* Article Content */}
          <article className="prose prose-blue prose-lg max-w-none text-zinc-800 leading-relaxed font-medium">
            <div
              className="space-y-6 [&>p]:leading-relaxed [&>p]:mb-6 [&>h3]:text-2xl [&>h3]:font-black [&>h3]:text-zinc-950 [&>h3]:mt-10 [&>h3]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>li]:pl-1"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* Social Sharing */}
          <ShareButtons title={blog.title} slug={blog.slug} />

          {/* Call to Action Box */}
          <div className="mt-16 bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border border-zinc-800">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12 scale-150">
              <Image src="/logo.png" alt="Apex Horizon Logo" width={300} height={50} />
            </div>
            <div className="relative z-10 max-w-xl">
              <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-bold block mb-3">Engineered for Dominance</span>
              <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight">Need a custom software solution for your enterprise?</h3>
              <p className="text-zinc-400 font-medium leading-relaxed text-sm md:text-base mb-8">
                From offline-first billing terminals to next-generation SaaS architectures, we build systems that automate operations, scale workflows, and run your business natively.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-500/20"
                >
                  Contact Our Studio
                </Link>
                <Link
                  href="/products"
                  className="px-6 py-3.5 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  View Product Suite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
