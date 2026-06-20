"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="testimonials"
      className="relative w-full bg-zinc-50 border-t border-zinc-200 text-zinc-900 py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans"
    >
      {/* Background Matrix Grid Alignment */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-blue-400 uppercase">
            <span className="w-3 h-[1px] bg-blue-500" /> Testimonials
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-zinc-900">
            What our clients say.
          </h2>

          <p className="mt-4 text-sm md:text-base text-zinc-600 max-w-xl leading-relaxed font-light">
            Feedback from partners who demand the same engineering standards we
            apply to our own builds.
          </p>
        </div>

        {/* Testimonial Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={cardVariants}
          className="w-full max-w-3xl border border-zinc-200 bg-white rounded-2xl p-8 md:p-12 backdrop-blur-2xl relative shadow-md group transition-all duration-300 hover:border-zinc-300 hover:shadow-lg"
        >
          {/* Subtle Top Inner Edge Specular Sheen */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent pointer-events-none rounded-t-2xl" />

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <div className="flex items-start gap-6 md:gap-8">
            {/* Quote Icon */}
            <span className="text-3xl md:text-4xl font-serif text-blue-500/70 font-bold select-none leading-none shrink-0">
              &ldquo;
            </span>

            {/* Testimonial Core Copy Block */}
            <div className="space-y-6 md:space-y-8 flex-1">
              <p className="text-base md:text-lg lg:text-xl text-zinc-800 leading-relaxed font-light italic tracking-wide drop-shadow-sm">
                An incredible partner from start to finish. They designed my
                company website and the process was seamless. The team was
                communicative, efficient, and the final product exceeded my
                expectations.
              </p>

              {/* Attribution Meta Data */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                  AV
                </div>
                <div>
                  <h4 className="font-bold tracking-wide text-zinc-900 text-sm">
                    Abhay Vaghela
                  </h4>
                  <p className="text-xs text-zinc-500 font-normal">
                    AB&apos;s Film Studio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}