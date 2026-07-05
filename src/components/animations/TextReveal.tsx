"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.06,
  once = true,
}: TextRevealProps) {
  const lines = children.split("\n");
  return (
    <Tag className={cn("overflow-hidden", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once, amount: 0.8 }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line || "\u00A0"}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
