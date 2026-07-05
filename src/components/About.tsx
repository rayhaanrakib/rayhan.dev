import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Lightbulb, Palette, Headphones } from 'lucide-react';
import { getProfile, type Profile } from '@/lib/api';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
    },
  }),
};

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) {
    return (
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/5 rounded w-24" />
            <div className="h-8 bg-white/5 rounded w-64" />
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-white/5 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const aboutCards = [
    {
      icon: Code,
      title: 'The Journey',
      content: profile.about.journey,
    },
    {
      icon: Lightbulb,
      title: 'Current Focus',
      content: profile.about.currentFocus,
    },
    {
      icon: Palette,
      title: 'Work Style',
      content: profile.about.workStyle,
    },
    {
      icon: Headphones,
      title: 'Beyond Code',
      content: profile.about.hobbies,
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Ambient background */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-64 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">01</span>
            <span className="section-label">// about.me</span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-3xl sm:text-4xl font-bold text-white"
            >
              Who I Am
            </motion.h2>
          </div>
        </motion.div>

        {/* Intro card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-xl p-6 sm:p-8 mb-8"
        >
          <p className="text-white/60 text-lg leading-relaxed">
            {profile.about.intro}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-xl p-6 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {card.title}
                </h3>
              </div>
              <p className="text-white/40 leading-relaxed text-sm">
                {card.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 glass-card rounded-xl p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Years Learning', value: '2+' },
              { label: 'Projects Shipped', value: '5+' },
              { label: 'Technologies', value: '15+' },
              { label: 'Courses Completed', value: '2' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-white/30 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
