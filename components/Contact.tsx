'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import GridScan from './GridScan';
import { supabase } from '@/lib/supabase';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

type FormState = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all placeholder-gray-600 text-white';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setFormState('loading');

    try {
      // 1. Try saving to Supabase
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([{ name, email, message, created_at: new Date().toISOString() }]);

      if (dbError) throw dbError;

      // 2. Optional: Web3Forms fallback/notification
      const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (web3Key && web3Key !== 'YOUR_WEB3FORMS_KEY') {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            name,
            email,
            message,
            subject: `Portfolio Contact from ${name}`,
          }),
        });
      }

      setFormState('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      console.error('Contact submit error:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 bg-[#0D121F] overflow-hidden min-h-[800px]">
      {/* Grid Scan WebGL Background */}
      <div className="absolute inset-0 z-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#1A2235"
          gridScale={0.1}
          scanColor="#00F5FF"
          scanOpacity={0.5}
          enablePost={true}
          bloomIntensity={0.8}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          enableWebcam={false}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Let's <span className="text-[var(--primary)]">Connect</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Whether you have a question or want to discuss a potential collaboration,
              my inbox is always open.
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#0D121F]/60 backdrop-blur-md rounded-3xl border border-white/8 shadow-2xl p-8 md:p-10">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-gray-400 max-w-sm">
                    Thanks for reaching out. Ravikumar will get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : formState === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <AlertCircle size={32} className="text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Oops! Something went wrong</h3>
                  <p className="text-gray-400 max-w-sm">
                    Please try again or reach out directly via the links below.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Tell me about your project or idea..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <div className="md:col-span-2">
                    <motion.button
                      type="submit"
                      disabled={formState === 'loading'}
                      whileHover={{ scale: formState === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: formState === 'loading' ? 1 : 0.98 }}
                      className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message <Send size={18} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-center mt-8 bg-white/3 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
            <a
              href="https://github.com/Whitedevil2004r27"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-gray-400 hover:text-[var(--primary)] transition-colors"
            >
              <GithubIcon /> <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ravikumarj27"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-gray-400 hover:text-[var(--primary)] transition-colors"
            >
              <LinkedinIcon /> <span>LinkedIn</span>
            </a>
            <a
              href="mailto:ravikumar@example.com"
              className="hidden md:flex items-center justify-center gap-3 text-gray-400 hover:text-[var(--primary)] transition-colors"
            >
              <Mail size={24} /> <span>Email</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
