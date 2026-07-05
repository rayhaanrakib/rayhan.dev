import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills, type SkillsData, type Skill } from '@/lib/api';
import { SkillIcon } from '@/components/shared/SkillIcon';

export default function Skills() {
  const [skills, setSkills] = useState<SkillsData | null>(null);

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  if (!skills) {
    return (
      <section id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/5 rounded w-24" />
            <div className="h-8 bg-white/5 rounded w-48" />
            <div className="grid grid-cols-4 gap-4 mt-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-24 bg-white/5 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Combine categories with soft skills
  const allCategories = [
    ...skills.categories,
    {
      name: "Soft Skills",
      skills: skills.softSkills.map(name => ({ name, icon: "" })),
    },
  ];

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-64 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">02</span>
            <span className="section-label">// skills.tech</span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl font-bold text-white"
            >
              Technical Arsenal
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid gap-10 md:gap-12">
          {allCategories.map((category, catIndex) => (
            <div key={category.name}>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-white/30">
                  // {String(catIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium text-white md:text-xl">
                  {category.name}
                </h3>
                <span className="ml-auto h-px flex-1 bg-white/10" />
              </div>

              {category.name.toLowerCase().includes("soft") ? (
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.04 },
                    },
                  }}
                >
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          transition: { ease: [0.16, 1, 0.3, 1], duration: 0.4 },
                        },
                      }}
                      className="rounded-full glass-card px-4 py-2 text-sm text-white/50 transition-colors hover:border-white/20 hover:text-white/70"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {category.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        delay: si * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        y: -6,
                        transition: { duration: 0.25 },
                      }}
                      className="group flex flex-col items-center justify-center gap-3 rounded-xl glass-card p-4 text-center md:p-5 cursor-default focus-within:outline-none focus-within:ring-2 focus-within:ring-accent/50"
                      tabIndex={0}
                    >
                      <SkillIcon
                        name={skill.name}
                        icon={skill.icon}
                        size={28}
                      />
                      <span className="text-xs font-medium text-white/40 transition-colors group-hover:text-white/70 md:text-sm">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
