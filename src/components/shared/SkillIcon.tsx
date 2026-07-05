"use client";

import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiReactrouter,
  SiReactquery,
  SiReacthookform,
  SiMui,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
  SiTypescript,
  SiWordpress,
  SiElementor,
  SiShopify,
  SiSublimetext,
  SiFigma,
  SiFramer,
  SiGoogle,
  SiNeon,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiVercel,
  SiStripe,
} from "react-icons/si";
import {
  Layers,
  Code2,
  Briefcase,
  Palette,
  PenTool,
  LayoutTemplate,
  Video,
  Monitor,
} from "lucide-react";
import { cn } from "@/utils/cn";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  "react-router": SiReactrouter,
  "react-query": SiReactquery,
  "react-hook-form": SiReacthookform,
  "material-ui": SiMui,
  javascript: SiJavascript,
  html5: SiHtml5,
  css: SiCss,
  tailwindcss: SiTailwindcss,
  bootstrap: SiBootstrap,
  express: SiExpress,
  mongodb: SiMongodb,
  firebase: SiFirebase,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  neon: SiNeon,
  neondb: SiNeon,
  supabase: SiSupabase,
  typescript: SiTypescript,
  oop: Layers,
  wordpress: SiWordpress,
  elementor: SiElementor,
  shopify: SiShopify,
  vscode: Monitor,
  sublime: SiSublimetext,
  figma: SiFigma,
  framer: SiFramer,
  office: Briefcase,
  google: SiGoogle,
  adobe: Palette,
  photoshop: Palette,
  illustrator: PenTool,
  xd: LayoutTemplate,
  premiere: Video,
  nodejs: SiNodedotjs,
  git: SiGit,
  github: SiGithub,
  vercel: SiVercel,
  stripe: SiStripe,
};

interface SkillIconProps {
  name: string;
  icon?: string;
  className?: string;
  size?: number;
}

export function SkillIcon({ name, icon, className, size = 24 }: SkillIconProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = icon ? iconMap[icon] ?? Code2 : Code2;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center transition-transform duration-300 ease-out",
        hovered && "scale-110",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon
        size={size}
        className={cn(
          "transition-colors duration-300",
          hovered ? "text-accent" : "text-text-secondary"
        )}
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}
