import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/images/logo.svg"
          alt=""
          aria-hidden="true"
          className="w-[400px] sm:w-[500px] lg:w-[600px] h-auto opacity-[0.01] select-none"
        />
      </div>

      {/* Ambient glow behind signature */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#7dd3fc]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Signature — large centered name ── */}
        <div className="py-20 sm:py-28 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "'HelloStockholm', sans-serif",
              fontSize: "clamp(4rem, 15vw, 10rem)",
              letterSpacing: "0.01em",
            }}
            className="text-white/[0.5] select-none leading-none"
          >Rakibul Islam
          </motion.p>

          {/* Designation */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="my-3 text-xs sm:text-sm font-mono text-white/75 tracking-widest uppercase"
          >
            Full-Stack Developer
          </motion.p>

          {/* Back to top */}
          <motion.button
            onClick={() => scrollTo("#hero")}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 flex items-center gap-2 text-sm text-white/25 hover:text-[#7dd3fc] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            Back to top
          </motion.button>

          <p className="mt-4 text-[11px] sm:text-xs text-white/20 font-mono text-center">
            built with React, TypeScript, Tailwind CSS, Framer Motion, GSAP,
            Lenis
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-mono">
            © {new Date().getFullYear()} Rakibul Islam Rayhan
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rayhaanrakib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-[#7dd3fc] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/rayhaanrakib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-[#7dd3fc] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
