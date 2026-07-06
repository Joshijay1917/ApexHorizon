import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { connectToDatabase } from "@/lib/database";
import Blog from "@/models/blog";
import BlogSearchFilter from "@/components/blogs/BlogSearchFilter";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Blogs | Apex Horizon Software Studio",
  description: "Read the latest engineering articles, product designs, and software studio insights from the Apex Horizon team.",
  keywords: [
    "software development blog", "apex horizon blog", "offline first architecture",
    "business management software blogs", "web development insights", "SaaS development guides"
  ],
  openGraph: {
    title: "Blogs | Apex Horizon Software Studio",
    description: "Read the latest engineering articles, product designs, and software studio insights from the Apex Horizon team.",
    url: "https://apexhorizon.dev/blogs",
    siteName: "Apex Horizon",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

async function getBlogs() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ published: true }).sort({ publishedAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs in Server Component:", error);
    return [];
  }
}

export default async function BlogsPage() {
  await connection();
  const blogs = await getBlogs();

  // The first blog is the featured post
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const remainingBlogs = blogs.length > 1 ? blogs.slice(1) : blogs;

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans flex flex-col selection:bg-blue-200">
      <Navbar />

      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden flex-1 animate-fadeIn">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Insights & Engineering
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-zinc-900">
              The Apex Journal
            </h1>
            
            <p className="text-xl text-zinc-600 font-medium">
              Deep dives into offline-first architectures, local billing terminals, secure data storage, and SaaS engineering guidelines.
            </p>
          </div>

          {/* Featured Blog (Most Recent) */}
          {featuredBlog && (
            <div className="mb-20">
              <div className="inline-flex items-center gap-2 mb-6 text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                <span>Featured Article</span>
                <span className="w-8 h-[1px] bg-zinc-200" />
              </div>

              <div className="group relative bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 lg:grid lg:grid-cols-12">
                {/* Image Cover */}
                <div className="relative aspect-video lg:aspect-auto lg:col-span-7 lg:min-h-[450px] overflow-hidden">
                  <Image
                    src={featuredBlog.coverImage || "/dashboard.png"}
                    alt={featuredBlog.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {featuredBlog.tags && featuredBlog.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/95 backdrop-blur-md text-blue-600 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm border border-blue-50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 md:p-12 lg:col-span-5 flex flex-col justify-between">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs font-semibold text-zinc-400 mb-6">
                      <span>{formatDate(featuredBlog.publishedAt || featuredBlog.createdAt)}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                      <span>{featuredBlog.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-950 mb-4 group-hover:text-blue-600 transition-colors tracking-tight leading-none">
                      <Link href={`/blogs/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-zinc-600 font-medium leading-relaxed mb-8 md:text-lg">
                      {featuredBlog.summary}
                    </p>
                  </div>

                  {/* Footer details */}
                  <div className="border-t border-zinc-100 pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black uppercase">
                        <Image src={'/logoforlightheme.png'} alt={'logo'} width={45} height={45} className="rounded-full"/>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-800 leading-none mb-1">{featuredBlog.author}</span>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Author</span>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all"
                    >
                      Read Full Story
                      <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Seeding hint if no blogs exist */}
          {blogs.length === 0 && (
            <div className="text-center py-20 bg-white border border-zinc-200 rounded-3xl max-w-2xl mx-auto shadow-sm">
              <div className="text-5xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Welcome to the Apex Journal</h3>
              <p className="text-zinc-500 max-w-md mx-auto text-sm mb-6 leading-relaxed">
                It looks like there are no published articles in the database yet. Click below to initialize our default engineering entries.
              </p>
              <a
                href="/api/blogs/seed"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors"
              >
                Seed Sample Articles
              </a>
            </div>
          )}

          {/* Grid of Remaining Blogs with Client Search/Filter */}
          {blogs.length > 0 && (
            <div>
              <div className="inline-flex items-center gap-2 mb-10 text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                <span>All Articles</span>
                <span className="w-8 h-[1px] bg-zinc-200" />
              </div>

              <BlogSearchFilter initialBlogs={remainingBlogs} />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
