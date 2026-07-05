import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { useScrollPosition, useActiveSection } from '@/hooks/useScrollPosition';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hours24 = now.getHours();
      const period = hours24 >= 12 ? 'PM' : 'AM';
      const hours12 = hours24 % 12 || 12;
      const h = String(hours12).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');

      // Compute GMT offset string like "GMT+6" or "GMT-5"
      const offsetMin = -now.getTimezoneOffset();
      const sign = offsetMin >= 0 ? '+' : '-';
      const absHours = Math.floor(Math.abs(offsetMin) / 60);
      const absMinutes = Math.abs(offsetMin) % 60;
      const offsetStr = absMinutes > 0
        ? `GMT${sign}${absHours}:${String(absMinutes).padStart(2, '0')}`
        : `GMT${sign}${absHours}`;

      setTime(`${h}:${m}:${s} ${period} ${offsetStr}`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <span className="font-mono text-sm tabular-nums text-accent">
      {time}
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(navLinks.map((l) => l.id));
  const { scrollTo, stop, start } = useSmoothScroll();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      stop();
    } else {
      document.body.style.overflow = '';
      start();
    }
    return () => {
      document.body.style.overflow = '';
      start();
    };
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    scrollTo(`#${id}`, { offset: -80 });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/30 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2 shrink-0"
            >
              <img className='w-4 h-4' src="/images/logo.svg" alt="Rakibul Islam Rayhan" />

              <span className="font-mono text-sm text-white/90">
                rayhan<span className="text-accent">.dev</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm transition-all duration-300 relative ${
                    activeSection === link.id
                      ? 'text-accent font-medium'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </button>
              ))}
            </div>

            {/* Live Clock — replaces Resume button */}
            <div className="hidden md:block shrink-0">
              <LiveClock />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/80 shrink-0"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-black/95 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 px-4 overflow-hidden">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-2xl font-display font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-accent scale-110'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="https://drive.google.com/file/d/1aScmah_mpoAZw5wjZtPSoOjBDw1AmDHJ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-6 py-3 text-black bg-accent rounded-md font-medium w-full text-center"
              >
                View Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
