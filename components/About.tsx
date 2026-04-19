'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import LogoLoop from './LogoLoop';

const FALLBACK_SKILLS = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'Python', 'AI / LLMs', 'Supabase',
  'GitHub API', 'Framer Motion', '3D UI', 'Intelligent Systems'
];

export default function About() {
  const [skills1, setSkills1] = useState<any[]>([]);
  const [skills2, setSkills2] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('id', { ascending: true });

        if (error || !data || data.length === 0) throw error || new Error('No data');

        const formatted = data.map(s => ({
          node: <span className="px-6 py-2 rounded-full border border-[var(--glass-border)] text-gray-300 font-medium whitespace-nowrap bg-[var(--background)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors">{s.name}</span>,
          title: s.name
        }));

        const mid = Math.ceil(formatted.length / 2);
        setSkills1(formatted.slice(0, mid));
        setSkills2(formatted.slice(mid));
      } catch (err) {
        console.warn('About: Falling back to static skills.');
        const formattedFallback = FALLBACK_SKILLS.map(s => ({
          node: <span className="px-6 py-2 rounded-full border border-[var(--glass-border)] text-gray-300 font-medium whitespace-nowrap bg-[var(--background)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors">{s}</span>,
          title: s
        }));
        setSkills1(formattedFallback.slice(0, 6));
        setSkills2(formattedFallback.slice(6));
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return (
    <section id="about" className="py-24 px-4 bg-[#0D121F] overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8">
            About <span className="text-[var(--primary)]">Me</span>
          </h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              I am a passionate <span className="text-white font-medium">Full Stack Developer</span> specializing 
              in scalable web applications and AI-driven solutions. Based in Tamil Nadu, India, I focus on building modern, efficient, and impactful digital products.
            </p>
            <p>
              With a strong emphasis on <span className="text-[var(--primary)]">clean UI/UX</span> and intelligent system design, 
              I bridge the gap between complex backend logic and visually stunning frontends. My goal is to create platforms 
              that aren't just functional, but inspiring.
            </p>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-10 neon-glow"
        >
          <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider">Expertise</h3>
          
          <div className="flex flex-col gap-6 w-full overflow-hidden">
            {!loading && (
              <>
                <LogoLoop
                  logos={skills1}
                  speed={40}
                  direction="left"
                  logoHeight={48}
                  gap={24}
                  hoverSpeed={0}
                  fadeOut
                  fadeOutColor="#0B0F19"
                  ariaLabel="Technology skills 1"
                />
                <LogoLoop
                  logos={skills2}
                  speed={40}
                  direction="right"
                  logoHeight={48}
                  gap={24}
                  hoverSpeed={0}
                  fadeOut
                  fadeOutColor="#0B0F19"
                  ariaLabel="Technology skills 2"
                />
              </>
            )}
            {loading && (
               <div className="h-24 w-full bg-white/5 animate-pulse rounded-2xl" />
            )}
          </div>
          
          <div className="mt-12 pt-8 border-t border-[var(--glass-border)]">
             <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 uppercase">Specialization</span>
                <span className="text-[var(--primary)] font-bold">AI + Full Stack</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
