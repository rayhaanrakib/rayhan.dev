import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { getProfile, type Profile } from '@/lib/api';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// Magnetic button component
function MagneticButton({
  children,
  className = '',
  ...props
}: React.ComponentProps<typeof motion.a>) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { scrollTo } = useSmoothScroll();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#a78bfa]/5 rounded-full blur-[150px]" />
      </motion.div>

      <div className="absolute inset-0 grid-pattern opacity-30" />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full"
      >
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Eyebrow with clip-path reveal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="section-label">// hello_world</span>
            </motion.div>

            {/* Name with clip-path reveal */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
              >
                {profile.name}
              </motion.h1>
            </div>

            {/* Designation with stagger */}
            <div className="overflow-hidden mb-6">
              <motion.p
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.55, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-display text-xl sm:text-2xl"
              >
                <span className="text-accent text-glow">{profile.designation}</span>
                {/* <span className="text-white/30 mx-3">—</span> */}
                {/* <span className="text-white/50">{profile.tagline}</span> */}
              </motion.p>
            </div>

            {/* Hero statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-white/40 text-lg leading-relaxed max-w-xl mb-8"
            >
              {profile.heroStatement}
            </motion.p>

            {/* Location with availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex items-center gap-2 text-white/30 text-sm mb-8"
            >
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] ml-3 animate-pulse" />
              <span className="text-[#4ade80]">{profile.status}</span>
            </motion.div>

            {/* CTAs with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href={`https://drive.google.com/uc?export=download&id=${profile.resumeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold rounded-md hover:bg-[#a5e0fc] transition-colors shadow-lg shadow-accent/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </MagneticButton>

              <motion.button
                onClick={() => scrollTo('#projects', { offset: -80 })}
                className="px-6 py-3 glass-card text-white/70 font-medium rounded-md hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-4 mt-10"
            >
              <span className="text-xs text-white/20 font-mono uppercase tracking-wider">Find me</span>
              <span className="h-px w-8 bg-white/10" />
              <motion.a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-md flex items-center justify-center text-white/40 hover:text-accent transition-colors"
                aria-label="GitHub"
                whileHover={{ y: -2 }}
              >
                <GithubIcon className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={profile.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-md flex items-center justify-center text-white/40 hover:text-accent transition-colors"
                aria-label="LinkedIn"
                whileHover={{ y: -2 }}
              >
                <LinkedinIcon className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>

          {/* Photo with reveal animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, clipPath: 'inset(10%)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0%)' }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2 order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">

              {/* Glass frame */}
              <div className="relative glass-card rounded-2xl p-2">
                <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden">
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                    }}
                  />
                </div>
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-0 -right-3 glass-card rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                  <span className="text-xs font-mono text-white/80">Open to work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/20 font-mono tracking-wider">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-white/20" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
