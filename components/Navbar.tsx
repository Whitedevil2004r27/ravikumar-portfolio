'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 hidden md:block",
        scrolled ? "w-[500px]" : "w-[600px]"
      )}>
        <div className="glass-card px-8 py-3 flex items-center justify-between">
          <div className="text-[var(--primary)] font-bold text-xl">R.J</div>
          <div className="flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActive(item.name)}
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

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
        <div className="glass-card px-6 py-4 flex items-center justify-around">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActive(item.name)}
              className={cn(
                "p-2 rounded-full transition-all",
                active === item.name ? "bg-[var(--primary)] text-[var(--background)]" : "text-gray-400"
              )}
            >
              <item.icon size={20} />
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
