import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Note: We're passing an empty name as the third argument if your AuthContext requires it
      const { error } = await signUp(email, password, '');
      if (error) throw error;
      
      setSuccess(true);
      // Removed automatic redirect to allow user to read the verification instruction
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await signInWithGoogle();
      if (error) throw error;
      // Note: redirect is handled by OAuth flow
    } catch (err: any) {
      setError(err.message || 'Google signup failed');
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-12">
        <div className="text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[42px] font-light tracking-[-1px] text-white leading-none mb-4"
          >
            Create Account
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[12px] uppercase tracking-[2px] text-gray-500 font-medium"
          >
            Join the collector registry
          </motion.p>
        </div>

        <div className="space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] font-bold uppercase tracking-[1px] p-3 rounded-lg text-center border bg-red-500/10 border-red-500/20 text-red-500"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] font-bold uppercase tracking-[1px] p-4 rounded-lg text-center border bg-green-500/10 border-green-500/20 text-green-500 space-y-2"
              >
                <p>Signup successful!</p>
                <p className="text-white/60 lowercase font-normal italic">Please check your email to verify your account before logging in.</p>
              </motion.div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-gray-800 rounded-full pl-12 pr-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-all text-[13px] font-medium"
                placeholder="Email Address"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 group-focus-within:text-white transition-colors" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-gray-800 rounded-full pl-12 pr-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-all text-[13px] font-medium"
                placeholder="Password (min 6 chars)"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 px-6 rounded-full font-bold uppercase tracking-[1px] text-[12px] hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign Up <ArrowRight className="h-3 w-3" />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-500 uppercase tracking-widest text-[10px] font-bold">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-transparent border border-gray-800 text-white py-4 px-6 rounded-full font-bold uppercase tracking-[1px] text-[12px] hover:bg-gray-900 transition-all disabled:opacity-50 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>

          <div className="text-center pt-4">
            <Link
              to="/login"
              className="text-[11px] text-gray-500 hover:text-white font-bold uppercase tracking-[1px] transition-colors"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
