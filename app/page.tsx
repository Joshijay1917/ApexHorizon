"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ConsultationModal from "@/components/modals/ConsultationModal";
import {
  containerVariants,
  leftPanelVariants,
  rightPanelVariants,
} from "@/constants/variants";
import ServicesSection from "@/components/home/Services";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import TechStack from "@/components/home/TechStack";
import DeliveryTimeline from "@/components/home/DeliveryTimeline";
import TestimonialsSection from "@/components/home/Testimonials";
import ContactSection from "@/components/home/Contact";
import Footer from "@/components/Footer";
import DeviceMockup from "@/components/home/DeviceMockup";


const WHATSAPP_URL =
  "https://wa.me/919429248465?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20consultation";

const statPills = [
  { label: "Starting At", value: "$79", icon: "💰" },
  { label: "Delivery", value: "2–6 Weeks", icon: "⚡" },
  { label: "Response", value: "< 24 Hours", icon: "🕐" },
  { label: "Stack", value: "8+ Tools", icon: "🛠️" },
];

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  return (
    <main>
      <section className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans select-none">
        <Navbar />

        {/* Logo */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex justify-center items-center mt-45 w-full"
        >
          <Image src="/logo.png" alt="Apex Horizon" width={700} height={70} />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-20 flex w-full items-center px-6 md:px-12 lg:px-20 py-32 mt-10"
          style={{ perspective: "1400px" }}
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            {/* Left Panel — Instant Answers */}
            <motion.div
              variants={{ leftPanelVariants }}
              className="flex flex-col justify-center items-start relative p-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 border border-blue-200 bg-blue-50/50 px-4 py-2 text-xs font-bold tracking-widest text-blue-700 backdrop-blur-md rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                Software Studio{" "}
                <span className="text-blue-500/80">// Rajkot</span>
              </div>

              {/* What do you build? */}
              <h1 className="max-w-xl text-5xl font-black leading-[1.1] md:text-6xl lg:text-7xl text-zinc-900 tracking-tight drop-shadow-sm">
                We Build Software{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">
                  That Runs Your Business.
                </span>
              </h1>

              {/* What services? */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Custom Websites",
                  "SaaS Products",
                  "Automation & Bots",
                  "API Integrations",
                ].map((service) => (
                  <span
                    key={service}
                    className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 tracking-wide"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Who is it for? */}
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-600 font-medium drop-shadow-sm">
                For local businesses, startups, and enterprises — we design
                subscription-ready products and engineered solutions built to
                scale.
              </p>

              {/* Stat Pills — How much? How long? */}
              {/* <div className="mt-8 flex flex-wrap gap-3">
                {statPills.map((pill) => (
                  <div
                    key={pill.label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white shadow-sm"
                  >
                    <span className="text-base">{pill.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 leading-none">
                        {pill.label}
                      </span>
                      <span className="text-sm font-bold text-zinc-900 tracking-tight leading-tight">
                        {pill.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div> */}

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="rounded-xl cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent px-8 py-4 text-xs text-white font-bold tracking-wider uppercase transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/25"
                >
                  Book Free Consultation
                </button>
                <a
                  href="#contact"

                  className="rounded-xl border cursor-pointer border-zinc-200 bg-white px-8 py-4 text-xs text-zinc-700 font-bold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
                >
                  Get Website Proposal →
                </a>
              </div>
            </motion.div>

            {/* Right Panel — Device Mockup */}
            <motion.div
              variants={{ rightPanelVariants }}
              className="md:absolute relative md:w-[50%] right-[-10px] aspect-4/3 lg:aspect-auto lg:h-[80%]"
            >
              <DeviceMockup
                laptopSrc="/dashboard.png"
                mobileSrc="/mobile.jpeg"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section Order: Services → Projects → Tech → Timeline → Testimonials → Contact → Footer */}
      <ServicesSection />

      <ProjectShowcase />

      <TechStack />

      <DeliveryTimeline />

      <TestimonialsSection />

      <ContactSection />

      <Footer />

      <AnimatePresence>
        {isConsultationOpen && (
          <ConsultationModal onClose={() => setIsConsultationOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
