'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DotField from './DotField';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Interactive Dot Field Background */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={18}
          bulgeStrength={50}
          glowRadius={180}
          sparkle={true}
          waveAmplitude={0.5}
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[var(--primary)] font-medium tracking-widest mb-4 uppercase">
            Available for new opportunities
          </h2>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
            Ravikumar <span className="text-[var(--primary)]">J</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            AI-Powered Full Stack Developer <br />
            <span className="text-gray-500 text-lg">"Transforming ideas into intelligent digital experiences."</span>
          </motion.p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="btn-primary"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="btn-outline"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[var(--primary)] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
