import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Journey from '@/components/Journey';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(onComplete, prefersReducedMotion ? 300 : 1800);
    return () => clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
        className="relative mb-8"
      >
          <img src="/images/favicon.ico" alt="Rakibul Islam Rayhan" />
        <motion.div
          className="absolute -inset-3 rounded-xl border border-accent/50"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Loading bar */}
      <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-white/30 text-sm font-mono"
      >
        Initializing...
      </motion.p>
    </motion.div>
  );
}

function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Noise overlay */}
      <div className="noise" />

      {/* Ambient blobs - will be visible through glass cards */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full bg-accent/5 blur-[150px]"
        style={{ top: '10%', left: '-20%' }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-[#a78bfa]/5 blur-[150px]"
        style={{ bottom: '20%', right: '-15%' }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/3 blur-[120px]"
        style={{ top: '60%', left: '30%' }}
      />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            color: '#e5e5e5',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      />

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <AmbientBackground />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Journey />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
