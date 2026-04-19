'use client';

import React from 'react';
import { motion } from 'framer-motion';

import LogoLoop from './LogoLoop';

const skills = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'Python', 'AI / LLMs', 'Supabase',
  'GitHub API', 'Framer Motion', '3D UI', 'Intelligent Systems'
];

const techLogos1 = skills.slice(0, 6).map(skill => ({
  node: <span className="px-6 py-2 rounded-full border border-[var(--glass-border)] text-gray-300 font-medium whitespace-nowrap bg-[var(--background)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors">{skill}</span>,
  title: skill
}));

const techLogos2 = skills.slice(6).map(skill => ({
  node: <span className="px-6 py-2 rounded-full border border-[var(--glass-border)] text-gray-300 font-medium whitespace-nowrap bg-[var(--background)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors">{skill}</span>,
  title: skill
}));

export default function About() {
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
            <LogoLoop
              logos={techLogos1}
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
              logos={techLogos2}
              speed={40}
              direction="right"
              logoHeight={48}
              gap={24}
              hoverSpeed={0}
              fadeOut
              fadeOutColor="#0B0F19"
              ariaLabel="Technology skills 2"
            />
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
