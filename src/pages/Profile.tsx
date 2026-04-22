import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Phone, Check, Loader2, Save } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    address: user?.user_metadata?.address || '',
    landmark: user?.user_metadata?.landmark || '',
    city: user?.user_metadata?.city || '',
    state: user?.user_metadata?.state || '',
    zip: user?.user_metadata?.zip || '',
    country: user?.user_metadata?.country || 'India',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await updateProfile(formData);
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h1 className="text-[42px] font-light tracking-[-1px] mb-4">Your Profile</h1>
          <p className="text-gray-500 text-[12px] uppercase tracking-[2px] font-medium">
            Manage your identity and shipping preferences
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info Section */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-bold">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px]">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px]">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-[14px] text-gray-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px]">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          {/* Shipping Section */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-bold">Delivery Address</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px]">Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                  placeholder=""
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px]">Landmark (Optional)</label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                  placeholder="e.g. Near Apollo Hospital"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px]">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px]">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px]">ZIP</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="col-span-2 md:col-span-1 space-y-2">
                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px]">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    disabled
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-[14px] text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-[11px] font-bold uppercase tracking-[1px] text-center">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-[1px] text-[12px] hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : success ? (
                <>
                  <Check className="w-4 h-4" /> Changes Saved
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
