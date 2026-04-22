import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreVertical,
  ArrowUpDown,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Package,
  Truck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { getSupabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

interface Order {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  product_name: string;
  product_variant: string;
  quantity: number;
  status: string;
  created_at: string;
}

export const AdminOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order Management</h1>
          <p className="text-gray-500 text-sm mt-1">Review, process, and track customer shipments.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-[#e5e5e7] rounded-xl text-sm focus:outline-none focus:border-blue-600 w-64 shadow-sm transition-all"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-[#e5e5e7] rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </header>

      <div className="space-y-6">
        <AnimatePresence>
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-sm border border-[#e5e5e7] overflow-hidden hover:border-blue-200 transition-colors"
            >
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-blue-600 font-bold uppercase">
                      {order.customer_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{order.customer_name}</h3>
                      <p className="text-xs text-gray-400 font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <StatusAction 
                        currentStatus={order.status} 
                        onUpdate={(s) => updateOrderStatus(order.id, s)}
                        isUpdating={updatingId === order.id}
                     />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Items */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Selection</h4>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <ShoppingBag className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{order.product_name}</p>
                        <p className="text-[11px] text-gray-500">{order.product_variant} • Qty: {order.quantity}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Info</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-3 h-3" />
                        <span className="text-xs">{order.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span className="text-xs">{order.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Destination</h4>
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                      <span className="text-xs">{order.address}, {order.city}</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Timeline</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-semibold">{new Date(order.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredOrders.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusAction: React.FC<{ currentStatus: string; onUpdate: (s: string) => void; isUpdating: boolean }> = ({ currentStatus, onUpdate, isUpdating }) => {
  const statuses = [
    { id: 'pending', label: 'Pending', icon: <Clock className="w-3 h-3" /> },
    { id: 'processing', label: 'Processing', icon: <Package className="w-3 h-3" /> },
    { id: 'shipped', label: 'Shipped', icon: <Truck className="w-3 h-3" /> },
    { id: 'delivered', label: 'Delivered', icon: <CheckCircle2 className="w-3 h-3" /> },
  ];

  const current = statuses.find(s => s.id === currentStatus) || statuses[0];

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-xl border border-[#e5e5e7]">
      {statuses.map((status) => (
        <button
          key={status.id}
          disabled={isUpdating}
          onClick={() => onUpdate(status.id)}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
            currentStatus === status.id 
              ? 'bg-white shadow-sm border border-[#e5e5e7] text-blue-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {status.icon}
          {status.label}
        </button>
      ))}
      {isUpdating && <Loader2 className="w-3 h-3 animate-spin text-blue-600 ml-2 mr-1" />}
    </div>
  );
};
