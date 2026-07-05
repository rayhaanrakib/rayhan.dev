import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollToOptions = Parameters<Lenis['scrollTo']>[1];

type SmoothScrollContextValue = {
  scrollTo: (target: string | number, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

function useReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      if (rafRef.current) {
        gsap.ticker.remove(rafRef.current);
        rafRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    instance.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };

    rafRef.current = raf;
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = instance;
    ScrollTrigger.refresh();

    return () => {
      if (rafRef.current) {
        gsap.ticker.remove(rafRef.current);
        rafRef.current = null;
      }
      instance.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollTo = (target: string | number, options?: ScrollToOptions) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -80, ...options });
      return;
    }

    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
      return;
    }

    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const start = () => {
    lenisRef.current?.start();
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
