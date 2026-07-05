import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TerminalLine {
  type: 'prompt' | 'response' | 'success' | 'data';
  content: string;
  delay: number;
}

const terminalLines: TerminalLine[] = [
  { type: 'prompt', content: 'GET /api/projects', delay: 0 },
  { type: 'success', content: '200 OK (42ms)', delay: 600 },
  { type: 'data', content: '{ "count": 3, "status": "success" }', delay: 1000 },
  { type: 'response', content: 'Streaming project data...', delay: 1400 },
];

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (!isInView) return;

    const timers: NodeJS.Timeout[] = [];

    terminalLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
        if (index === terminalLines.length - 1) {
          setTimeout(() => setTyping(false), 500);
        }
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="max-w-lg mx-auto mb-12"
    >
      {/* Terminal window */}
      <div className="glass-card rounded-xl overflow-hidden border-accent/20">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-white/20 font-mono">api.rayhan.dev</span>
        </div>

        {/* Terminal Body */}
        <div className="p-5 min-h-[140px] font-mono text-sm leading-relaxed">
          {terminalLines.slice(0, visibleLines).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-2"
            >
              {line.type === 'prompt' && (
                <span>
                  <span className="text-accent">$ </span>
                  <span className="text-[#fbbf24]">GET </span>
                  <span className="text-white/60">{line.content.replace('GET ', '')}</span>
                </span>
              )}
              {line.type === 'success' && (
                <span className="text-[#4ade80]">→ {line.content}</span>
              )}
              {line.type === 'data' && (
                <span className="text-white/40">{line.content}</span>
              )}
              {line.type === 'response' && (
                <span className="text-white/30">{line.content}</span>
              )}
            </motion.div>
          ))}

          {/* Cursor */}
          {isInView && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block"
            >
              <span className="text-accent">$ </span>
              {typing && <span className="cursor-blink text-white/50">▊</span>}
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
