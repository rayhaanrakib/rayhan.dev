import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, ChevronRight } from 'lucide-react';
import { GithubIcon } from './icons';
import type { Project } from '@/lib/api';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap and scroll lock
  useEffect(() => {
    // Save previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Focus the close button
    closeButtonRef.current?.focus();

    return () => {
      // Restore scroll
      document.body.style.overflow = '';
      // Return focus to trigger element
      previousActiveElement.current?.focus();
    };
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden glass-card rounded-xl"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh] overscroll-contain">
          {/* Hero Image */}
          <div className="relative h-48 sm:h-56">
            <img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div className="absolute bottom-4 left-6 right-16">
              <span className="inline-block px-2 py-0.5 text-xs bg-white/10 backdrop-blur-sm text-white/70 rounded mb-2">
                {project.category} • {project.timeline}
              </span>
              <h2 id="modal-title" className="font-display text-2xl sm:text-3xl font-bold text-white">
                {project.name}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Action Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-accent text-black rounded-md font-medium hover:bg-[#a5e0fc] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 glass text-white/80 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Source Code
              </a>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                // about
              </h3>
              <p className="text-white/60 leading-relaxed">{project.description}</p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                // tech_stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm bg-accent/10 text-accent rounded border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div>
              <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                // metrics
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="glass rounded-lg p-4 text-center">
                    <p className="font-display text-xl font-bold text-accent">{metric.value}</p>
                    <p className="text-xs text-white/40 mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div>
              <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                // challenges
              </h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                    <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Future Improvements */}
            <div>
              <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">
                // future_plans
              </h3>
              <ul className="space-y-2">
                {project.improvements.map((improvement, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/40">
                    <span className="text-accent">→</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
