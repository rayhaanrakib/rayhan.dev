import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Terminal from './Terminal';
import ProjectModal from './ProjectModal';
import { getProjects, type ProjectsData, type Project } from '@/lib/api';

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block w-full text-left focus:outline-none focus:ring-0 rounded-2xl h-full"
      aria-label={`View details for ${project.name}`}
    >
      <motion.article
        className="glass-card relative overflow-hidden rounded-2xl h-full flex flex-col"
        whileHover={{ y: -8, rotateX: 2, rotateY: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        {/* ── Cover image ── */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black shrink-0">
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />

          {/* Category + timeline chips */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <span className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
              {project.category}
            </span>
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/60 bg-white/5 backdrop-blur-md rounded-full border border-white/5">
              {project.timeline}
            </span>
          </div>

          {/* Featured dot */}
          {project.featured && (
            <div className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-[#00c8b3] shadow-[0_0_8px_2px_rgba(125,211,252,0.5)] z-10" />
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#00c8b3] px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-[#00c8b3]/25">
              View Details <ArrowUpRight size={16} />
            </span>
          </motion.div>
        </div>

        {/* ── Card body — flex-1 to fill remaining height ── */}
        <div className="p-5 flex flex-col flex-1">
          {/* Tech stack pills */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/30">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#00c8b3]">
            {project.name}
          </h3>

          {/* Tagline — fixed 2 lines so all cards match height */}
          <p className="mt-2 text-sm leading-relaxed text-white/40 line-clamp-2">
            {project.tagline}
          </p>

          {/* Spacer pushes footer to the bottom */}
          <div className="flex-1" />

          {/* Bottom divider + timeline */}
          <div className="mt-4 border-t border-white/[0.06] pt-4">
            <span className="font-mono text-xs text-white/25">
              {project.timeline} · Solo Build
            </span>
          </div>
        </div>
      </motion.article>
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function Projects() {
  const [projects, setProjects] = useState<ProjectsData | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  /* Skeleton */
  if (!projects) {
    return (
      <section id="projects" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-3 bg-white/5 rounded w-28" />
            <div className="h-8 bg-white/5 rounded w-52" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[420px] bg-white/[0.03] rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#00c8b3]/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section header + Terminal side-by-side on desktop ── */}
        <div className="mb-14 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="section-number">04</span>
              <span className="section-label">// projects</span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight"
              >
                Featured Work
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-white/40 max-w-lg"
            >
              Projects I've built from scratch — each one pushed me to solve
              real problems and ship working products.
            </motion.p>
          </div>
          <div className="lg:justify-self-end">
            {/* <Terminal /> */}
          </div>
        </div>

        {/* ── Project grid ── */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
        >
          {projects.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="flex"
            >
              <ProjectCard
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
