import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code2, GraduationCap, Play, Award, ExternalLink } from 'lucide-react';
import { getJourney, getEducation, type JourneyData, type EducationData } from '@/lib/api';

const typeIcons: Record<string, React.ElementType> = {
  current: Rocket,
  project: Code2,
  education: GraduationCap,
  start: Play,
};

const typeStyles: Record<string, { bg: string; text: string; glow: string }> = {
  current: { bg: 'bg-accent', text: 'text-black', glow: 'shadow-accent/30' },
  project: { bg: 'bg-white/20', text: 'text-white', glow: 'shadow-white/10' },
  education: { bg: 'bg-white/10', text: 'text-white/70', glow: '' },
  start: { bg: 'bg-white/5', text: 'text-white/50', glow: '' },
};

export default function Journey() {
  const [journey, setJourney] = useState<JourneyData | null>(null);
  const [education, setEducation] = useState<EducationData | null>(null);

  useEffect(() => {
    Promise.all([getJourney(), getEducation()]).then(([j, e]) => {
      setJourney(j);
      setEducation(e);
    });
  }, []);

  if (!journey || !education) {
    return (
      <section id="journey" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/5 rounded w-24" />
            <div className="h-8 bg-white/5 rounded w-48" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="journey" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">03</span>
            <span className="section-label">// journey.log</span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              My Journey
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-xl"
          >
            From self-taught beginnings to pushing into full-stack territory —
            every step has been intentional.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-[30px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent" />

          {journey.milestones.map((milestone, index) => {
            const IconComponent = typeIcons[milestone.type] || Code2;
            const style = typeStyles[milestone.type] || typeStyles.project;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative pl-12 md:pl-20 pb-10 last:pb-0"
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-[7px] md:left-[19px] w-6 h-6 rounded-full ${style.bg} ${style.text} flex items-center justify-center shadow-lg ${style.glow}`}
                  whileHover={{ scale: 1.2 }}
                >
                  <IconComponent className="w-3 h-3" />
                </motion.div>

                {/* Card */}
                <motion.div
                  className="glass-card rounded-xl p-5 sm:p-6"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono text-sm text-accent">{milestone.year}</span>
                    {milestone.type === 'current' && (
                      <span className="px-2 py-0.5 text-xs bg-accent/20 text-accent rounded-md border border-accent/30 animate-pulse">
                        Currently
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">
                    {milestone.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-white/5 text-white/40 rounded border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Education & Certifications */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-mono text-sm text-white/30 uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h3>
            {education.education.map((edu) => (
              <motion.div
                key={edu.id}
                className="glass-card rounded-xl p-5"
                whileHover={{ y: -2 }}
              >
                <h4 className="font-display font-semibold text-white">
                  {edu.degree}
                </h4>
                <p className="text-accent text-sm">{edu.institution}</p>
                {edu.affiliation && (
                  <p className="text-white/30 text-sm">{edu.affiliation}</p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-white/25">{edu.period}</span>
                  {edu.status === 'appeared' && edu.statusNote && (
                    <span className="px-2 py-0.5 text-xs bg-white/5 text-white/40 rounded">
                      {edu.statusNote}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-mono text-sm text-white/30 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certifications
            </h3>
            <div className="space-y-4">
              {education.certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  className="glass-card rounded-xl p-5"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-display font-semibold text-white">
                        {cert.name}
                      </h4>
                      <p className="text-accent text-sm">{cert.issuer}</p>
                      <p className="text-white/25 text-xs mt-1">{cert.year}</p>
                    </div>
                    {cert.validationLink && (
                      <a
                        href={cert.validationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-accent/70 hover:text-accent transition-colors"
                        aria-label="Validate certificate"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {cert.description && (
                    <p className="text-white/35 text-sm mt-3">{cert.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
