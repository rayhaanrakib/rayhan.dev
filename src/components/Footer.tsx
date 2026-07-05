import { motion } from 'framer-motion';
import { Heart, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

const techStack = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        {/* Top Signature Section */}
        {/* <div className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.06)]">
              <Terminal className="w-5 h-5 text-black" />
            </div>
            <div className="text-left">
              <div className="text-accent text-3xl sm:text-5xl lg:text-6xl font-semibold italic tracking-tight leading-none">
                rayhan
              </div>
              <div className="mt-2 text-white font-bold uppercase tracking-[0.2em] text-sm sm:text-base">
                software engineer
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/rayhaanrakib"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass-card rounded-md flex items-center justify-center text-white/40 hover:text-accent hover:border-white/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/rayhaanrakib"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass-card rounded-md flex items-center justify-center text-white/40 hover:text-accent hover:border-white/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div> */}

        {/* Bottom Section */}
        <div className="pt-8 sm:pt-10 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <div className="space-y-3">
            <p className="text-white/20 text-sm flex items-center gap-1.5 flex-wrap">
              © {new Date().getFullYear()} Rakibul Islam Rayhan. Made with
              <Heart className="w-3.5 h-3.5 text-[#f87171] fill-[#f87171]" />
            </p>
          </div>

          {/* Tech Stack */}
          <div className="w-full lg:w-auto lg:max-w-[50%]">
            <h4 className="font-mono text-xs text-white/20 uppercase tracking-[0.2em] mb-4 text-center lg:text-right">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs bg-white/[0.03] text-white/35 rounded-full border border-white/5 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}