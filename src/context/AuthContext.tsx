import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getSupabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ data: any, error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any, error: any }>;
  signInWithOtp: (email: string) => Promise<{ data: any, error: any }>;
  verifyOtp: (email: string, token: string) => Promise<{ data: any, error: any }>;
  updateProfile: (data: { fullName?: string; address?: string; landmark?: string; city?: string; state?: string; zip?: string; country?: string; phone?: string }) => Promise<{ data: any, error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const supabase = getSupabase();
      
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }).catch(err => {
        console.error("Error getting session", err);
        setLoading(false);
      });

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (e) {
      console.error("Failed to initialize Supabase Auth", e);
      setLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: fullName,
          },
        },
      });
      return { data, error };
    } catch (e) {
      return { data: null, error: e };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (e) {
      return { data: null, error: e };
    }
  };

  const signInWithOtp = async (email: string) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      return { data, error };
    } catch (e) {
      return { data: null, error: e };
    }
  };

  const verifyOtp = async (email: string, token: string) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });
      return { data, error };
    } catch (e) {
      return { data: null, error: e };
    }
  };

  const signOut = async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Sign out error", e);
    }
  };

  const updateProfile = async (profileData: { fullName?: string; address?: string; landmark?: string; city?: string; state?: string; zip?: string; country?: string; phone?: string }) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.fullName,
          address: profileData.address,
          landmark: profileData.landmark,
          city: profileData.city,
          state: profileData.state,
          zip: profileData.zip,
          country: profileData.country,
          phone: profileData.phone,
        }
      });
      return { data, error };
    } catch (e) {
      return { data: null, error: e };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, signUp, signIn, signInWithOtp, verifyOtp, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
