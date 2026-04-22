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
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Note: We're passing an empty name as the third argument if your AuthContext requires it
      const { error } = await signUp(email, password, '');
      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
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
                className="text-[11px] font-bold uppercase tracking-[1px] p-3 rounded-lg text-center border bg-green-500/10 border-green-500/20 text-green-500"
              >
                Signup successful! Redirecting to login...
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
