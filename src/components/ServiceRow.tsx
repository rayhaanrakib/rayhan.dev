import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ServiceRowProps {
  index: number;
  title: string;
  tags: string[];
  total: number;
}

export default function ServiceRow({ index, title, tags, total }: ServiceRowProps) {
  const [, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const mouseY = useMotionValue(0);
  const mouseX = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const numberStr = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={rowRef}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Hover spotlight gradient that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [x, y],
            ([latestX, latestY]) =>
              `radial-gradient(600px circle at ${latestX}px ${latestY}px, rgba(26,26,26,0.04), transparent 60%)`
          ),
        }}
      />

      {/* Top border line */}
      <div className="relative overflow-hidden">
        <motion.div
          className="h-px w-full bg-charcoal/10"
          variants={{
            rest: { scaleX: 1 },
            hover: { scaleX: 1 },
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-px w-full bg-charcoal origin-left"
          variants={{
            rest: { scaleX: 0 },
            hover: { scaleX: 1 },
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Row content */}
      <div className="relative z-10 py-8 md:py-10 lg:py-12 px-2 md:px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
          {/* Left side: number + title */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Animated index number */}
            <motion.span
              className="text-sm font-medium text-warm-gray font-mono tracking-wider"
              variants={{
                rest: { opacity: 0.4, x: 0 },
                hover: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {numberStr}
            </motion.span>

            {/* Service title with clip-path reveal */}
            <div className="relative overflow-hidden">
              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal tracking-tight leading-tight"
                variants={{
                  rest: { y: 0 },
                  hover: { y: 0 },
                }}
              >
                <motion.span
                  className="inline-block"
                  variants={{
                    rest: { y: 0 },
                    hover: { y: -2 },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {title}
                </motion.span>
              </motion.h3>
            </div>
          </div>

          {/* Right side: tags + arrow */}
          <div className="flex items-center gap-4 md:gap-6 ml-12 md:ml-0">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="inline-flex items-center"
                  variants={{
                    rest: { opacity: 0.65, y: 0 },
                    hover: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="text-xs sm:text-sm text-warm-gray whitespace-nowrap font-medium tracking-wide">
                    {tag}
                  </span>
                  {i < tags.length - 1 && (
                    <motion.span
                      className="text-warm-gray-light ml-1.5 text-xs"
                      variants={{
                        rest: { opacity: 0.4 },
                        hover: { opacity: 1 },
                      }}
                    >
                      •
                    </motion.span>
                  )}
                </motion.span>
              ))}
            </div>

            {/* Arrow icon */}
            <motion.div
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-charcoal/10 flex-shrink-0"
              variants={{
                rest: {
                  scale: 1,
                  backgroundColor: "rgba(26,26,26,0)",
                  borderColor: "rgba(26,26,26,0.1)",
                },
                hover: {
                  scale: 1,
                  backgroundColor: "rgba(26,26,26,1)",
                  borderColor: "rgba(26,26,26,1)",
                },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                variants={{
                  rest: { rotate: 0, color: "#1a1a1a" },
                  hover: { rotate: -45, color: "#f0ece4" },
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <path
                  d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </div>
        </div>

        {/* Expanded tags on hover - additional tags shown */}
        <motion.div
          className="flex flex-wrap gap-2 mt-4 ml-12 md:ml-16"
          variants={{
            rest: { height: 0, opacity: 0, marginTop: 0 },
            hover: { height: "auto", opacity: 1, marginTop: 16 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-charcoal/10 text-charcoal/70 bg-cream-dark/50"
              variants={{
                rest: { opacity: 0, y: 8, scale: 0.95 },
                hover: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{
                duration: 0.4,
                delay: 0.05 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom border line (only for last item) */}
      {index === total - 1 && (
        <div className="relative overflow-hidden">
          <motion.div
            className="h-px w-full bg-charcoal/10"
            variants={{
              rest: { scaleX: 1 },
              hover: { scaleX: 1 },
            }}
          />
          <motion.div
            className="absolute top-0 left-0 h-px w-full bg-charcoal origin-left"
            variants={{
              rest: { scaleX: 0 },
              hover: { scaleX: 1 },
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </motion.div>
  );
}
