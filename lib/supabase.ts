import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Dynamic features will use fallback data.');
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
