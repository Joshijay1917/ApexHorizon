"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LimitedOfferModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen or completed the offer action
    const hasSeen = localStorage.getItem("hasSeenLimitedOffer");
    if (hasSeen) return;

    // Start a 60-second timer to show the modal
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenLimitedOffer", "true");
  };

  const handleClaim = () => {
    localStorage.setItem("hasSeenLimitedOffer", "true");
    setIsOpen(false);
    
    // Open WhatsApp with a prefilled message
    const message = encodeURIComponent(
      "Hi! I saw your Limited Launch Offer and I'd like to claim a spot for the $50 professional website!"
    );
    window.open(`https://wa.me/919429248465?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-zinc-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent border */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition p-2 rounded-full hover:bg-zinc-100 cursor-pointer z-10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 pt-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 rounded-full shadow-sm mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Special Promo
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-black text-zinc-900 leading-tight">
                🚀 Limited Launch Offer
              </h3>

              {/* Offer Description */}
              <p className="text-sm md:text-base text-zinc-600 mt-4 leading-relaxed font-light">
                We&apos;re building a professional website for the{" "}
                <span className="font-bold text-zinc-900 bg-amber-100 px-1 py-0.5 rounded">
                  first 5 clients
                </span>{" "}
                for just{" "}
                <span className="font-bold text-blue-600 text-lg">$50</span>.
              </p>

              {/* Included / Not Included Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 p-5 bg-zinc-50 rounded-xl border border-zinc-100">
                {/* Included Column */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold mb-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Included
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> Custom website
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> Full source code
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> Responsive design
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> Free deployment
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> 1 week of support
                    </li>
                  </ul>
                </div>

                {/* Not Included Column */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-rose-700 font-bold mb-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Not included
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-600 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-0.5">✗</span>
                      <span>
                        Custom domain
                        <span className="text-[10px] text-zinc-400 block font-normal leading-normal">
                          (e.g. yourbusiness.com)
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold mt-0.5">✗</span>
                      <span>
                        Paid hosting services
                        <span className="text-[10px] text-zinc-400 block font-normal leading-normal">
                          (if required)
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Note */}
              <p className="text-[11px] text-zinc-500 italic mt-6 border-l-2 border-zinc-200 pl-3 leading-relaxed">
                *Offer valid for the first 5 confirmed clients only. Regular pricing applies afterward.
                Free deployment is included using platforms like Vercel, Netlify, or GitHub Pages. The client is responsible for purchasing a custom domain if desired.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
                <button
                  onClick={handleClaim}
                  className="w-full sm:flex-1 cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-xs text-white font-bold tracking-wider uppercase text-center shadow-lg shadow-blue-500/25 transition duration-300 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-95"
                >
                  Claim My Spot
                </button>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto cursor-pointer rounded-xl border border-zinc-200 bg-white px-6 py-4 text-xs text-zinc-600 font-bold tracking-wider uppercase text-center hover:bg-zinc-50 hover:text-zinc-900 transition duration-300 active:scale-95"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
