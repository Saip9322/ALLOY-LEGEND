import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

/**
 * Lazily initializes and returns the Supabase client.
 * Provides a clear warning if environment variables are missing.
 */
const supabaseUrl = "https://iexpxxtjukwpdptmenyi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleHB4eHRqdWt3cGRwdG1lbnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMzQ3NjAsImV4cCI6MjA5MTkxMDc2MH0.TTDpQbJWEAWqrahIL1fxKgxYE5BMB-7dUynbSz6MIs0";

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};
