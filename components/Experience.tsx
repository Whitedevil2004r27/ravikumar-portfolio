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
    <section id="experience" className="py-24 px-4 bg-[#0B0F19]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Professional <span className="text-[var(--primary)]">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            A timeline of my professional growth, technical milestones, and the impact I've made across diverse projects.
          </p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:left-1/2 md:-translate-x-px">
          {experience.map((item, index) => (
            <div key={item.id} className="mb-12 relative">
              <div className="absolute top-0 -left-1.5 md:left-1/2 md:-translate-x-1.5 w-3 h-3 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)] z-10" />

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center w-full ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="hidden md:flex flex-1 justify-center px-8">
                   <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                      <Calendar size={14} className="text-[var(--primary)]" />
                      {item.year}
                   </div>
                </div>

                <div className="flex-1 w-full md:w-auto px-8">
                  <div className="glass-card p-6 border border-white/5 hover:border-[var(--primary)] transition-all cursor-default group">
                    <div className="md:hidden flex items-center gap-2 text-gray-500 font-mono text-xs mb-3">
                      <Calendar size={12} className="text-[var(--primary)]" />
                      {item.year}
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-white/5 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-black transition-colors">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                        <p className="text-[var(--primary)] font-medium text-sm mb-4">{item.company}</p>
                        
                        <ul className="space-y-2">
                          {item.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                              <ChevronRight size={14} className="text-[var(--primary)] mt-1 flex-shrink-0" />
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
