import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Calendar,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { getSupabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

interface Order {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  city: string;
  state?: string;
  country?: string;
  landmark?: string;
  address: string;
  product_name: string;
  product_variant: string;
  quantity: number;
  status: string;
  created_at: string;
}

export const AdminPreOrders: React.FC = () => {
  const { user } = useAuth();
  const { products } = useProducts();
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
      
      // Filter the orders to only include PreOrders.
      // We check if the product in the orders matches a product with isPreOrder = true in our context
      // OR if the product_variant was explicitly "PreOrder"
      const preOrdersInfo = (data || []).filter((o: Order) => {
        const prod = products.find(p => p.name === o.product_name);
        return (prod && prod.isPreOrder) || (o.product_variant && o.product_variant.includes('PreOrder'));
      });

      setOrders(preOrdersInfo);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user, products]);

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

  const downloadExcel = (order: Order) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Order ID,Customer,Email,Phone,Address,Product,Quantity,Status,Date\n"
      + `${order.id},"${order.customer_name}","${order.email}","${order.phone}","${order.address}","${order.product_name}","${order.quantity}","${order.status}","${new Date(order.created_at).toLocaleString()}"`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PreOrder_${order.id.slice(0, 8)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pre-Order Management</h1>
          <p className="text-gray-500 text-sm mt-1">Review, process, and track customer pre-orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search pre-orders..."
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

                     <div className="flex items-center gap-4">
                     <button
                        onClick={() => {
                          const link = `${window.location.origin}/checkout/balance/${order.id}`;
                          const subject = encodeURIComponent(`Your Pre-Ordered Model Has Arrived!`);
                          const body = encodeURIComponent(`Hi ${order.customer_name},\n\nGreat news! Your pre-ordered model "${order.product_name}" has finally arrived.\n\nPlease complete your order by paying the remaining balance amount using the secure link below:\n\n${link}\n\nOnce the payment is completed, we will dispatch your model within 48hrs.\n\nThank you for your patience and support!\nAlloy Legends Team`);
                          
                          // Open mail client
                          window.location.href = `mailto:${order.email}?subject=${subject}&body=${body}`;
                          alert(`Email template generated!\n\nPlease ensure you send this email from admin@alloylegends.com.\n\nIf your email client didn't open automatically, you can manually send an email to ${order.email} with the link:\n\n${link}`);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                        title="Send Balance Payment Link"
                     >
                       <ShoppingBag className="w-4 h-4" />
                       Collect Balance
                     </button>

                     <button
                        onClick={() => downloadExcel(order)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                        title="Export to Excel/CSV"
                     >
                       <Download className="w-4 h-4" />
                       Export
                     </button>
                     <StatusAction 
                        currentStatus={order.status} 
                        onUpdate={(s) => updateOrderStatus(order.id, s)}
                        isUpdating={updatingId === order.id}
                     />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#e5e5e7] pt-6 mt-4">
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

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Info</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div><span className="font-semibold">Email:</span> {order.email}</div>
                      <div><span className="font-semibold">Phone:</span> {order.phone}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Destination</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>{order.address}</div>
                    </div>
                  </div>

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
            <h3 className="text-lg font-bold text-gray-900">No pre-orders found</h3>
            <p className="text-gray-500 text-sm">There are no pre-orders matching your criteria.</p>
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
