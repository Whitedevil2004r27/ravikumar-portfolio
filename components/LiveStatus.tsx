'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, type LiveStatus } from '@/lib/supabase';
import { Activity } from 'lucide-react';

export default function LiveStatus() {
  const [status, setStatus] = useState<LiveStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const { data, error } = await supabase
          .from('status')
          .select('*')
          .eq('is_active', true)
          .single();

        if (error) throw error;
        setStatus(data);
      } catch (err) {
        console.warn('LiveStatus: Falling back to default.');
        setStatus({
          id: 0,
          status: 'Available for new opportunities',
          is_active: true,
          updated_at: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'status' },
        () => fetchStatus()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return (
    <div className="h-6 w-48 bg-white/5 animate-pulse rounded-full border border-white/5" />
  );

  return (
    <AnimatePresence mode="wait">
      {status && (
        <motion.div
          key={status.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl shadow-black/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-300 flex items-center gap-2">
             <Activity size={12} className="text-[var(--primary)]" />
             {status.status}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
