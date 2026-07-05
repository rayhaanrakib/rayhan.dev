import { motion } from 'framer-motion';
import { ArrowUp, Heart, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const techStack = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'];

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  const handleNavClick = (id: string) => {
    scrollTo(`#${id}`, { offset: -80 });
  };

  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
                <Terminal className="w-4 h-4 text-black" />
              </div>
              <span className="font-mono text-sm text-white/80">
                rayhan<span className="text-accent">.dev</span>
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-4">
              Full-stack developer from Bangladesh, building end-to-end web experiences
              with modern technologies.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/rayhaanrakib"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass-card rounded-md flex items-center justify-center text-white/30 hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass-card rounded-md flex items-center justify-center text-white/30 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-white/20 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-sm text-white/30 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Built With */}
          <div>
            <h4 className="font-mono text-xs text-white/20 uppercase tracking-wider mb-4">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-white/[0.03] text-white/30 rounded border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-white/15 text-xs font-mono">
              // data-driven • GET-only
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} Rakibul Islam Rayhan. Made with
            <Heart className="w-3.5 h-3.5 text-[#f87171] fill-[#f87171]" />
          </p>

          <motion.button
            onClick={() => scrollTo('#hero')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 glass-card rounded-md text-white/30 hover:text-accent transition-colors text-sm"
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
