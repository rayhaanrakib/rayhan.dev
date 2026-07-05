import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Layers, AlertTriangle, CheckCircle } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "@/lib/api";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const scrollPositionRef = useRef(0);

  // ── Ultra-simple, bulletproof scroll lock ──
  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    scrollPositionRef.current = window.scrollY;

    // Lock the body COMPLETELY
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    containerRef.current?.focus();

    return () => {
      // Restore everything EXACTLY
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollPositionRef.current);

      previousActiveElement.current?.focus();
    };
  }, []);

  // ── Escape key + focus trap ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const isPlaceholderLink = useCallback(
    (url: string) => !url || url === "#",
    [],
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100]" data-lenis-prevent>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Centering wrapper */}
        <div className="absolute inset-0 flex items-end justify-center md:items-center md:p-8 lg:p-12">
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card relative flex w-full h-[92vh] md:h-auto md:max-h-[78vh] flex-col overflow-hidden rounded-t-2xl outline-none md:max-w-4xl md:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white/50 transition-colors hover:text-white hover:bg-white/10"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>

            {/* ── Scrollable inner content ── */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="overflow-y-auto overscroll-contain flex-1 min-h-0"
            >
              <div className="grid gap-6 p-5 md:p-7 lg:grid-cols-2 lg:items-start">
                {/* ─── LEFT COLUMN ─── */}
                <div>
                  {/* Eyebrow */}
                  <span className="font-mono text-[11px] text-[#00c8b3]/50 uppercase tracking-wider mb-1.5 inline-block">
                    // project.{project.slug}
                  </span>

                  {/* Title */}
                  <h2
                    id="project-modal-title"
                    className="font-display text-2xl font-bold leading-tight text-white md:text-3xl"
                  >
                    {project.name}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-white/50 md:text-base">
                    {project.description}
                  </p>

                  {/* Timeline + category chips */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] font-medium text-white/50">
                      <Calendar size={12} /> {project.timeline}
                    </span>
                    <span className="inline-flex items-center rounded-full glass px-2.5 py-1 text-[11px] font-medium text-white/35">
                      {project.category}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {!isPlaceholderLink(project.liveUrl) ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#00c8b3] px-4 py-2 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_20px_rgba(125,211,252,0.3)]"
                      >
                        <ExternalLink size={14} /> Live Site
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/25">
                        <ExternalLink size={14} /> Live link coming soon
                      </span>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 ${
                        isPlaceholderLink(project.githubUrl) ? "opacity-40" : ""
                      }`}
                    >
                      <GithubIcon className="w-4 h-4" /> GitHub
                    </a>
                  </div>

                  {/* 3 Highlight Features */}
                  <section className="mt-6">
                    <h3 className="mb-3 font-display text-base font-semibold text-white">
                      Key Highlights
                    </h3>
                    <div className="space-y-2.5">
                      {project.highlightFeatures.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.06 }}
                          className="flex items-start gap-2.5 rounded-xl glass p-3"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00c8b3]/10 text-[11px] font-bold text-[#00c8b3]">
                            {i + 1}
                          </span>
                          <span className="text-[13px] leading-relaxed text-white/50">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                  {/* Tech Stack */}
                  <div className="glass rounded-xl p-4 mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[#00c8b3]">
                      <Layers size={16} />
                      <h3 className="font-display text-sm font-semibold text-white">
                        Tech Stack
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/45"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ─── RIGHT COLUMN ─── */}
                <div className="space-y-4 mt-6">
                  {/* Cover image */}
                  <div className="relative aspect-16/10 overflow-hidden rounded-xl glass">
                    <img
                      src={project.coverImage}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                  </div>

                  {/* Challenges */}
                  <div className="glass rounded-xl p-4 mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[#00c8b3]">
                      <AlertTriangle size={16} />
                      <h3 className="font-display text-sm font-semibold text-white">
                        Challenges
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, i) => (
                        <li
                          key={i}
                          className="text-[13px] leading-relaxed text-white/40"
                        >
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* improvements */}
                  <div className="glass rounded-xl p-4 mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[#00c8b3]">
                      <CheckCircle size={16} />
                      <h3 className="font-display text-sm font-semibold text-white">
                        Improvements
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {project.improvements.map((improvement, i) => (
                        <li
                          key={i}
                          className="text-[13px] leading-relaxed text-white/40"
                        >
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
