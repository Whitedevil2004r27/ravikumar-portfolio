'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

interface ExperienceItem {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string[];
}

const FALLBACK_EXP: ExperienceItem[] = [
  {
    id: 1,
    year: '2023 - Present',
    role: 'AI Full Stack Developer',
    company: 'Freelance / Projects',
    description: [
      'Building high-performance 3D web applications using Three.js and Spline.',
      'Integrating advanced AI capabilities using Gemini and OpenAI APIs.',
      'Developing scalable full-stack architectures with Next.js and Supabase.'
    ]
  },
  {
    id: 2,
    year: '2022 - 2023',
    role: 'Full Stack Developer',
    company: 'CertiFind',
    description: [
      'Architected a certification verification platform using the T3 stack.',
      'Implemented real-time data syncing using Supabase real-time subscriptions.',
      'Optimized database queries, reducing load times by 60%.'
    ]
  }
];

export default function Experience() {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('order_index', { ascending: true });

        if (error || !data || data.length === 0) throw error || new Error('No data');
        setExperience(data);
      } catch (err) {
        console.warn('Experience: Falling back to static data.');
        setExperience(FALLBACK_EXP);
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-16 md:py-24 px-4 bg-[#0B0F19] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-[var(--primary)]">Journey</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto px-4">
            A timeline of my professional growth, technical milestones, and the impact I've made across diverse projects.
          </p>
        </motion.div>

        {/* Mobile Timeline (simple vertical stack, left-aligned) */}
        <div className="md:hidden relative border-l-2 border-white/10 ml-3 space-y-8">
          {experience.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8"
            >
              {/* Node dot */}
              <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-[var(--primary)] shadow-[0_0_12px_var(--primary)] border-2 border-[#0B0F19]" />
              
              {/* Year badge */}
              <div className="flex items-center gap-1.5 text-gray-500 font-mono text-xs mb-3">
                <Calendar size={11} className="text-[var(--primary)]" />
                {item.year}
              </div>

              <div className="glass-card p-5 border border-white/5 hover:border-[var(--primary)] transition-all group">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-black transition-colors flex-shrink-0">
                    <Briefcase size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white mb-0.5 leading-tight">{item.role}</h3>
                    <p className="text-[var(--primary)] font-medium text-xs mb-3">{item.company}</p>
                    <ul className="space-y-1.5">
                      {item.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400 text-xs leading-relaxed">
                          <ChevronRight size={12} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Timeline (centered, alternating) */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px bg-white/10" />

          <div className="space-y-12">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={item.id} className="relative flex items-center">
                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--primary)] shadow-[0_0_14px_var(--primary)] border-2 border-[#0B0F19] z-10" />

                  {/* Left side: content or year label */}
                  <div className="w-1/2 pr-10 flex justify-end">
                    {isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-sm"
                      >
                        <div className="glass-card p-6 border border-white/5 hover:border-[var(--primary)] transition-all group">
                          <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mb-3">
                            <Calendar size={12} className="text-[var(--primary)]" />
                            {item.year}
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-lg bg-white/5 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-black transition-colors flex-shrink-0">
                              <Briefcase size={18} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white mb-1">{item.role}</h3>
                              <p className="text-[var(--primary)] font-medium text-sm mb-3">{item.company}</p>
                              <ul className="space-y-1.5">
                                {item.description.map((desc, i) => (
                                  <li key={i} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                                    <ChevronRight size={13} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                                    {desc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                        <Calendar size={13} className="text-[var(--primary)]" />
                        {item.year}
                      </div>
                    )}
                  </div>

                  {/* Right side: content or year label */}
                  <div className="w-1/2 pl-10">
                    {!isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-sm"
                      >
                        <div className="glass-card p-6 border border-white/5 hover:border-[var(--primary)] transition-all group">
                          <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mb-3">
                            <Calendar size={12} className="text-[var(--primary)]" />
                            {item.year}
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-lg bg-white/5 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-black transition-colors flex-shrink-0">
                              <Briefcase size={18} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white mb-1">{item.role}</h3>
                              <p className="text-[var(--primary)] font-medium text-sm mb-3">{item.company}</p>
                              <ul className="space-y-1.5">
                                {item.description.map((desc, i) => (
                                  <li key={i} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                                    <ChevronRight size={13} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                                    {desc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                        <Calendar size={13} className="text-[var(--primary)]" />
                        {item.year}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
