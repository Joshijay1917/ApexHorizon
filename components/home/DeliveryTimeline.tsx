"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    phase: "01",
    title: "Discovery",
    description: "We learn your business, define scope, and map requirements.",
    timeline: "Week 1",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    phase: "02",
    title: "Design",
    description: "Wireframes, UI mockups, and architecture planning.",
    timeline: "Week 1–2",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    phase: "03",
    title: "Development",
    description: "Building with clean code, testing, and iterations.",
    timeline: "Week 2–5",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    phase: "04",
    title: "Delivery",
    description: "Deployed, tested, and handed off with full documentation.",
    timeline: "Week 5–6",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function DeliveryTimeline() {
  return (
    <section className="relative w-full bg-white border-t border-zinc-200 text-zinc-900 py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
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
            <span className="w-3 h-[1px] bg-blue-500" /> Process
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-zinc-900">
            From idea to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              launch in weeks.
            </span>
          </h2>

          <p className="mt-6 text-sm md:text-base text-zinc-600 max-w-lg leading-relaxed font-light">
            Our streamlined 4-phase process delivers quality software on
            predictable timelines. Most projects ship within 2–6 weeks.
          </p>
        </div>

        {/* Timeline Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.phase}
              variants={stepVariants}
              className="group relative"
            >
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-0 h-[1px] -mr-6">
                  <div className="w-full h-full bg-gradient-to-r from-blue-300 to-blue-100" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-300" />
                </div>
              )}

              <div className="relative p-6 rounded-2xl border border-zinc-200 bg-zinc-50 transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
                {/* Phase number + icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    Phase {step.phase}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold tracking-tight text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-zinc-600 leading-relaxed font-light mb-4">
                  {step.description}
                </p>

                {/* Timeline badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-mono font-bold tracking-wider text-blue-600 uppercase">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {step.timeline}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
