import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials missing. Build will proceed, but dynamic features will use fallbacks.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper types for the database
export type LiveStatus = {
  id: number;
  status: string;
  is_active: boolean;
  updated_at: string;
};

export type Skill = {
  id: number;
  name: string;
  category: string;
  icon_url?: string;
};
