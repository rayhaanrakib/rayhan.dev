import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star, Sparkles } from 'lucide-react';
import Terminal from './Terminal';
import ProjectModal from './ProjectModal';
import { getProjects, type ProjectsData, type Project } from '@/lib/api';

function ProjectCard({
  project,
  index,
  onOpen
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <button
        ref={cardRef}
        onClick={onOpen}
        className="w-full text-left glass-card rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
        aria-label={`View details for ${project.name}`}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {project.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-accent/20 border border-accent/30 backdrop-blur-sm">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-xs font-medium text-accent">Featured</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs bg-white/10 backdrop-blur-sm text-white/70 rounded">
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/50">
              <Clock className="w-3 h-3" />
              {project.timeline}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
            {project.name}
          </h3>

          <p className="text-white/40 text-sm mb-4 line-clamp-2">
            {project.tagline}
          </p>

          {/* 3 Highlight Features */}
          <div className="space-y-2 mb-4">
            {project.highlightFeatures.slice(0, 3).map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-white/50"
              >
                <Sparkles className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                <span className="line-clamp-2">{feature}</span>
              </div>
            ))}
          </div>

          {/* View Details CTA */}
          <div className="flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
            View Details
            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectsData | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  if (!projects) {
    return (
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/5 rounded w-24" />
            <div className="h-8 bg-white/5 rounded w-48" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-white/5 rounded-xl" />
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
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">04</span>
            <span className="section-label">// projects</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured Work
          </h2>
          <p className="text-white/50 max-w-xl">
            Projects I've built from scratch — each one pushed me to solve real problems
            and ship working products.
          </p>
        </motion.div>

        {/* Terminal Animation */}
        {/* <Terminal /> */}

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
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
