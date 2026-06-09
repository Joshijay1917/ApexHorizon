"use client";

import { globalUiVariants } from "@/constants/variants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <motion.nav 
        initial="hidden"
        animate="visible"
        variants={{globalUiVariants}}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-5 px-8 md:px-16 lg:px-24 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 shadow-sm transition-all duration-300"
      >
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Apex Horizon" width={180} height={28} className="cursor-pointer hover:opacity-90 transition-opacity" />
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600">
        <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
        <Link href="/#services" className="hover:text-blue-600 transition-colors">Services</Link>
        <Link href="/#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</Link>
        <Link href="/#contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        <Link href="/#contact" className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl transition-all duration-300 font-bold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5">Get Started →</Link>
      </div>
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(true)}
          className="text-slate-600 hover:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.633h16.5M3.75 12h16.5m-16.5 5.367h16.5" />
          </svg>
        </button>
      </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-screen w-74 bg-white shadow-2xl z-50 flex flex-col p-5 md:hidden"
            >
              <div className="flex justify-between mb-8">
                <Image src="/logo.png" alt="Apex Horizon" width={180} height={28} className="cursor-pointer hover:opacity-90 transition-opacity" />
                <button onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-black p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-6 text-lg font-semibold text-zinc-600">
                <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors">Products</Link>
                <Link href="/#services" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors">Services</Link>
                <Link href="/#testimonials" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors">Testimonials</Link>
                <Link href="/#contact" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors">Contact</Link>
                <Link href="/#contact" onClick={() => setIsOpen(false)} className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl text-center shadow-md">Get Started</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}