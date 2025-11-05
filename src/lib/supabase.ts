import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging for Vercel deployment
console.log('Supabase Config Debug:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING',
  keyExists: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length || 0,
  environment: typeof window !== 'undefined' ? 'browser' : 'server'
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables missing:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey,
    allEnvVars: Object.keys(import.meta.env)
  });
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Candidate {
  id: string;
  name: string;
  description: string;
  location: string;
  skills: string[];
  languages: string[];
  created_at: string;
}
