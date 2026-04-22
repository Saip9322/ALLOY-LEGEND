import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getSupabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface Order {
  id: string;
  created_at: string;
  product_name: string;
  product_variant: string;
  quantity: number;
  status: 'pending' | 'shipped' | 'delivered' | 'processing';
  address: string;
  city: string;
}

export const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;

      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'processing': return <Package className="w-4 h-4 text-blue-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const getStatusText = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-white animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-[42px] font-light tracking-[-1px] mb-4">Your Orders</h1>
          <p className="text-gray-500 text-[12px] uppercase tracking-[2px] font-medium">
            Manage and track your precision collection
          </p>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-gray-800">
            <Package className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No orders found</h3>
            <p className="text-gray-500 text-sm mb-8">Start your collection today and they will appear here.</p>
            <Link to="/" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-[1px] text-[12px] hover:bg-gray-200 transition-colors">
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                layout
                className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-colors group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-gray-800 px-2 py-1 rounded font-mono text-gray-400">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[1px]">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/50 rounded-full">
                        {getStatusIcon(order.status)}
                        <span className="text-[10px] font-bold uppercase tracking-[1px]">
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-1">{order.product_name}</h3>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[1px] mb-4">{order.product_variant} • Qty: {order.quantity}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                      <div>
                        <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-[1px] mb-2">Shipping Address</h4>
                        <p className="text-[13px] text-gray-300 leading-relaxed">
                          {order.address}, {order.city}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-[1px] mb-2">Delivery Progress</h4>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ 
                              width: order.status === 'delivered' ? '100%' : 
                                     order.status === 'shipped' ? '75%' : 
                                     order.status === 'processing' ? '40%' : '15%' 
                            }}
                            className="h-full bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
