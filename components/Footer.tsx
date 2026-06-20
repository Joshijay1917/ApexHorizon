"use client";

const WHATSAPP_URL =
  "https://wa.me/919106052826?text=Hi%2C%20I%27d%20like%20to%20start%20a%20project";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-zinc-50 border-t border-zinc-200 text-zinc-500 font-sans z-30">
      {/* CTA Strip */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-8 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg tracking-tight">
              Ready to build something great?
            </h3>
            <p className="text-blue-100 text-sm font-light mt-1">
              Get a free proposal within 24 hours — no commitment required.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white text-blue-600 font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:bg-blue-50 tracking-wide"
          >
            Book Free Consultation →
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-8 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-mono tracking-wider uppercase">
          {/* Left Side: Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <span className="text-zinc-900 font-bold tracking-[0.15em]">
              © {new Date().getFullYear()} APEX HORIZON
            </span>
            <span className="hidden sm:inline text-zinc-300">|</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_#10b981]" />
              All Systems Operational // Local Inference Node
            </span>
          </div>

          {/* Right Side: Back to Top */}
          <div className="flex items-center gap-6">
            <button
              onClick={handleScrollToTop}
              className="text-zinc-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
            >
              Scroll to Viewport Top
              <span className="transform transition-transform duration-200 group-hover:-translate-y-0.5 font-sans font-bold">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}