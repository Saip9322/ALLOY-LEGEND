import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, Package, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

interface TrackedOrder {
  id: string;
  created_at: string;
  product_name: string;
  product_variant: string;
  quantity: number;
  status: 'pending' | 'shipped' | 'delivered' | 'processing';
  address: string;
  landmark?: string;
  city: string;
  state?: string;
  country?: string;
}

export const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const supabase = getSupabase();
      // Search for order by full ID or short ID prefix
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .or(`id.eq.${orderId},id.ilike.${orderId}%`)
        .single();

      if (error || !data) {
        throw new Error('Order not found. Please check your Order ID.');
      }

      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: TrackedOrder['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-8 h-8 text-amber-500" />;
      case 'processing': return <Package className="w-8 h-8 text-blue-500" />;
      case 'shipped': return <Truck className="w-8 h-8 text-purple-500" />;
      case 'delivered': return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      default: return null;
    }
  };

  const steps = [
    { key: 'pending', label: 'Ordered' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const currentStep = steps.findIndex(s => s.key === order?.status);

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-[42px] font-light tracking-[-1px] mb-4">Track Order</h1>
          <p className="text-gray-500 text-[12px] uppercase tracking-[2px] font-medium">
            Enter your order ID to see real-time updates
          </p>
        </header>

        {/* Search Bar */}
        <form onSubmit={handleTrack} className="relative max-w-xl mx-auto mb-12">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. 550e8400...)"
            className="w-full bg-gray-900/30 border border-gray-800 rounded-full px-8 py-5 text-[15px] focus:outline-none focus:border-white transition-all pr-16"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-2 bottom-2 bg-white text-black px-6 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 text-red-500 text-[11px] font-bold uppercase tracking-[1px] bg-red-500/10 border border-red-500/20 p-4 rounded-2xl"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/30 border border-gray-800 rounded-[32px] p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-gray-800">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{order.product_name}</h2>
                  <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[1px]">
                    OrderID: <span className="text-white">#{order.id.toUpperCase()}</span>
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[1px] mb-1">Status</p>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-bold uppercase tracking-[1px]">{order.status}</span>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative mb-12">
                <div className="hidden md:flex justify-between items-center relative z-10">
                  {steps.map((step, idx) => (
                    <div key={step.key} className="flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        idx <= currentStep ? 'bg-white text-black' : 'bg-gray-800 text-gray-600'
                      }`}>
                        {idx < currentStep ? <CheckCircle2 className="w-6 h-6" /> : (
                          idx === currentStep ? getStatusIcon(step.key as any) : idx + 1
                        )}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-[1px] ${
                        idx <= currentStep ? 'text-white' : 'text-gray-600'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Connector Line */}
                <div className="hidden md:block absolute top-[24px] left-[40px] right-[40px] h-[2px] bg-gray-800 -z-0">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    className="h-full bg-white transition-all duration-1000"
                  />
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-6">
                  {steps.map((step, idx) => (
                    <div key={step.key} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        idx <= currentStep ? 'bg-white text-black' : 'bg-gray-800 text-gray-500'
                      }`}>
                        {idx <= currentStep ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-[1px] ${
                         idx <= currentStep ? 'text-white' : 'text-gray-600'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-800">
                <div>
                  <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-[1px] mb-3">Shipping To</h4>
                  <div className="text-[13px] text-gray-300 leading-relaxed uppercase font-mono space-y-1">
                    <p>{order.address}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-[1px] mb-3">Order Summary</h4>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500">Qty: {order.quantity}x {order.product_variant}</span>
                    <span className="text-white font-bold">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
