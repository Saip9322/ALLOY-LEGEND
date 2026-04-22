import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Info,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Loader2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { appName, setAppName } = useAppContext();
  const [newName, setNewName] = useState(appName);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate saving to a service
    setTimeout(() => {
      setAppName(newName);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">System Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure global application branding and behavior.</p>
      </header>

      <div className="space-y-6">
        {/* Branding Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-[#e5e5e7] overflow-hidden"
        >
          <div className="p-6 border-b border-[#e5e5e7] flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900">Branding</h3>
          </div>
          <form onSubmit={handleSave} className="p-6 space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Application Name</label>
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-gray-50 border border-[#e5e5e7] rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                placeholder="e.g. Alloy Legends"
              />
              <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                <Info className="w-3 h-3" /> This name will update across the entire customer-facing site.
              </p>
            </div>

            <div className="pt-4 border-t border-[#e5e5e7] flex items-center justify-between">
              {success && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-bold text-green-600 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" /> All changes synchronized
                </motion.span>
              )}
              <button
                type="submit"
                disabled={loading || newName === appName}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                Save Branding Changes
              </button>
            </div>
          </form>
        </motion.div>

        {/* Security Section (Placeholder) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-[#e5e5e7] opacity-60 pointer-events-none"
        >
           <div className="p-6 border-b border-[#e5e5e7] flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-900">Security & Authentication</h3>
          </div>
          <div className="p-6">
            <p className="text-xs text-gray-500">Authentication policies are managed via Supabase Environment Variables.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CheckCircle2: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
