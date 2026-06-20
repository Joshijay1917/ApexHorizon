"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Apex Management",
    description:
      "Offline-first retail billing terminal with WhatsApp-powered inventory management, GST invoicing, and real-time stock alerts.",
    image: "/dashboard.png",
    link: "/products/apexmanagement",
    deliveredIn: "4 weeks",
    tech: ["Next.js", "Electron", "MongoDB", "WhatsApp API"],
    status: "Live",
  },
  {
    title: "AB's Film Studio",
    description:
      "Professional portfolio website for a film production studio — responsive, fast-loading, and SEO-optimized.",
    image: "/ab-film.png",
    link: "https://ab-s-film-production.vercel.app",
    deliveredIn: "2 weeks",
    tech: ["Next.js", "Tailwind", "Vercel"],
    status: "Delivered",
  },
  {
    title: "Email Nexus",
    description:
      "Intelligent email routing and automation platform with ML-powered categorization and CRM integration.",
    image: "/emailnexus.png",
    link: "#",
    deliveredIn: "In progress",
    tech: ["React", "Node.js", "PostgreSQL", "ML"],
    status: "Building",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ProjectShowcase() {
  return (
    <section
      id="projects"
      className="relative w-full bg-white border-t border-zinc-200 text-zinc-900 py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans"
    >
      {/* Background grid */}
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

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-blue-400 uppercase">
            <span className="w-3 h-[1px] bg-blue-500" /> Our Work
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-zinc-900">
            Projects we&apos;ve <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              shipped.
            </span>
          </h2>

          <p className="mt-6 text-sm md:text-base text-zinc-600 max-w-lg leading-relaxed font-light">
            Real products and client sites — built with the same engineering
            rigor we apply to everything.
          </p>
        </div>

        {/* Project Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group relative bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-zinc-300"
            >
              {/* Screenshot */}
              <div className="relative w-full aspect-video bg-zinc-100 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Delivery Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200/50 text-[10px] font-mono font-bold tracking-wider text-zinc-700 shadow-sm uppercase">
                  {project.status === "Building" ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {project.deliveredIn}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {project.deliveredIn}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-zinc-600 leading-relaxed font-light line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.link !== "#" ? (
                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 pt-2 group-hover:gap-3 transition-all"
                  >
                    View Project
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                ) : (
                  project.title === "AB's Film Studio" ? <>
                    <Link href={project.link}>View project</Link>
                  </> 
                  : <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 pt-2">
                    {project.status === "Building"
                      ? "Coming Soon"
                      : "Client Project"}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
