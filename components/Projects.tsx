'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';
import BorderGlow from './BorderGlow';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
);
import { Repository, getRepositories, filterRepositories } from '@/lib/github';

const categories = ['All', 'AI', 'Full Stack', 'Web'];

export default function Projects() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      const data = await getRepositories('Whitedevil2004r27');
      setRepos(data);
      setLoading(false);
    }
    loadRepos();
  }, []);

  const filteredRepos = filterRepositories(repos, activeCategory);

  return (
    <section id="projects" className="py-24 px-4 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Featured <span className="text-[var(--primary)]">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-lg">
              A curated collection of my most impactful work, dynamically synchronized with my GitHub activity.
            </p>
          </div>

          <div className="flex gap-2 p-1 glass-card rounded-full overflow-hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-[var(--primary)] text-[var(--background)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-64 animate-pulse bg-gray-900/50" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredRepos.slice(0, 9).map((repo) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="h-full group"
                >
                  <BorderGlow
                    glowColor="180 100 50"
                    backgroundColor="#0B0F19"
                    borderRadius={24}
                    glowRadius={40}
                    coneSpread={20}
                    className="h-full"
                    colors={['#00F5FF', '#38bdf8', '#8400FF']}
                  >
                    <div className="p-8 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-gray-900 rounded-xl group-hover:bg-[var(--primary)] group-hover:text-[var(--background)] transition-colors">
                          <Terminal size={24} />
                        </div>
                        <div className="flex gap-4 text-gray-400 group-hover:text-white transition-colors">
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <GithubIcon />
                          </a>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
                        {repo.name.replace(/-/g, ' ')}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                        {repo.description || "No description provided. Explore this project on GitHub to see more details."}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-[var(--glass-border)] relative z-10">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                          {repo.language || 'Documentation'}
                        </span>
                        <a 
                          href={repo.html_url} 
                          className="text-[var(--primary)] text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Details <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
