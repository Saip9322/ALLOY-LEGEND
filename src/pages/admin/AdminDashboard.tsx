import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  Menu, 
  X, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2,
  Search,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getSupabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = getSupabase();
        
        // Fetch Stats
        const { data: allOrders, error: ordersError } = await supabase
          .from('orders')
          .select('*');

        if (ordersError) throw ordersError;

        const totalRevenue = 0; // total_amount column doesn't exist in current schema
        const pendingCount = allOrders.filter((o: any) => o.status === 'pending').length;
        const deliveredCount = allOrders.filter((o: any) => o.status === 'delivered').length;

        setStats([
          { label: 'Total Revenue', value: 'N/A', icon: <TrendingUp className="w-5 h-5 text-blue-600" /> },
          { label: 'Total Orders', value: allOrders.length, icon: <ShoppingBag className="w-5 h-5 text-purple-600" /> },
          { label: 'Processing', value: pendingCount, icon: <Clock className="w-5 h-5 text-amber-600" /> },
          { label: 'Delivered', value: deliveredCount, icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
        ]);

        // Recent Orders
        const { data: recent, error: recentError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (recentError) throw recentError;
        setRecentOrders(recent || []);

      } catch (err) {
        console.error('Admin Data Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5e5e7]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-xl">{stat.icon}</div>
              {stat.trend && (
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e7] overflow-hidden">
        <div className="p-6 border-b border-[#e5e5e7] flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Transactions</h3>
          <Link to="/admin/orders" className="text-xs font-semibold text-blue-600 hover:text-blue-700">View all orders</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-[#e5e5e7]">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e7]">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-gray-400">#{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-semibold text-gray-900">{order.customer_name}</p>
                    <p className="text-[10px] text-gray-500">{order.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-medium text-gray-900">{order.product_name}</p>
                    <p className="text-[10px] text-gray-500">{order.product_variant} • Qty: {order.quantity}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const NavLink: React.FC<{ to: string; active: boolean; icon: React.ReactNode; label: string }> = ({ to, active, icon, label }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="text-sm font-semibold">{label}</span>
  </Link>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600 border-amber-200',
    processing: 'bg-blue-50 text-blue-600 border-blue-200',
    shipped: 'bg-purple-50 text-purple-600 border-purple-200',
    delivered: 'bg-green-50 text-green-600 border-green-200',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  );
};
