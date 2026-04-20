'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Mail, Menu, X, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Clock },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Close mobile menu on scroll
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  const handleNavClick = (name: string) => {
    setActive(name);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop Navbar (pill, centered, top) ── */}
      <nav className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 hidden md:block",
        scrolled ? "w-[500px]" : "w-[620px]"
      )}>
        <div className="glass-card px-8 py-3 flex items-center justify-between">
          <div className="text-[var(--primary)] font-bold text-xl">R.J</div>
          <div className="flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.name)}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-[var(--primary)]",
                  active === item.name ? "text-[var(--primary)]" : "text-gray-400"
                )}
              >
                {item.name}
                {active === item.name && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--primary)]"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Mobile Top Navbar ── */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-[#0B0F19]/95 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}>
        <div className="flex items-center justify-between px-5 py-4">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => handleNavClick('Home')}
            className="text-[var(--primary)] font-bold text-xl tracking-tight"
          >
            R<span className="text-white">.</span>J
          </a>

          {/* Active page label */}
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            {active}
          </span>

          {/* Hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="px-4 py-3 space-y-1 bg-[#0B0F19]/98">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(item.name)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                      active === item.name
                        ? "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30"
                        : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                    {active === item.name && (
                      <motion.div
                        layoutId="mobileActiveTab"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile top spacer so hero content isn't hidden under navbar */}
      <div className="h-16 md:hidden" />
    </>
  );
}
