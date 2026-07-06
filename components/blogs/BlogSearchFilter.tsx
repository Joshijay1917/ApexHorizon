"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface BlogDoc {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  coverImage: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  createdAt: string;
}

interface BlogSearchFilterProps {
  initialBlogs: BlogDoc[];
}

export default function BlogSearchFilter({ initialBlogs }: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Compile list of unique tags from all blogs
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    initialBlogs.forEach((blog) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach((tag) => tagsSet.add(tag));
      }
    });
    return ["All", ...Array.from(tagsSet)];
  }, [initialBlogs]);

  // Filter blogs based on search text and selected tag
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag === "All" || blog.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [initialBlogs, searchQuery, selectedTag]);

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
    <div className="w-full">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16 relative z-10 w-full">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search articles, topics, tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-zinc-200 rounded-2xl text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm font-medium text-sm"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Tags List */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all border cursor-pointer ${
                selectedTag === tag
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 shadow-sm"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Blogs */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col h-full bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Cover Image */}
              <Link href={`/blogs/${blog.slug}`} className="relative aspect-video w-full overflow-hidden block">
                <Image
                  src={blog.coverImage || "/dashboard.png"}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {blog.tags && blog.tags.slice(0, 1).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-1">
                {/* Meta Head */}
                <div className="flex items-center gap-3 text-xs font-semibold text-zinc-400 mb-4">
                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                  <span>{blog.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-zinc-950 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-zinc-600 font-medium text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {blog.summary}
                </p>

                {/* Footer details */}
                <div className="border-t border-zinc-100 pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* User profile placeholder */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-black uppercase">
                      <Image src={'/logoforlightheme.png'} alt={'logo'} width={45} height={45} className="rounded-full"/>
                    </div>
                    <span className="text-xs font-bold text-zinc-700">{blog.author}</span>
                  </div>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:gap-2 transition-all"
                  >
                    Read Article
                    <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-zinc-50 border border-dashed border-zinc-200 rounded-3xl"
        >
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-zinc-900 mb-1">No articles found</h3>
          <p className="text-zinc-500 max-w-sm mx-auto text-sm">
            We couldn't find any results matching "{searchQuery}". Try using different terms or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("All");
            }}
            className="mt-6 px-5 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors"
          >
            Clear Search & Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
