import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { useActiveSection } from '@/hooks/useScrollPosition';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(navLinks.map((l) => l.id));
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    scrollTo(`#${id}`, { offset: -80 });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2"
            >
              <img className='w-4 h-4' src="/images/logo.svg" alt="Rakibul Islam Rayhan" />

              <span className="font-mono text-sm text-white/90">
                rayhan<span className="text-accent">.dev</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
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

            {/* Resume CTA */}
            <div className="hidden md:block">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-black bg-accent rounded-md hover:bg-[#a5e0fc] transition-colors"
              >
                Resume
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/80"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/95">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-2xl font-display font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-accent scale-110'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              className="mt-4 px-6 py-3 text-black bg-accent rounded-md font-medium"
            >
              View Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}
