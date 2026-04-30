import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSupabase } from '../lib/supabase';
import { Loader2, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { motion } from 'motion/react';

export const BalanceCheckout: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // We are mocking finding the original product to determine full price.
  const [originalProduct, setOriginalProduct] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (error) throw error;
        setOrder(data);

        // Find the product to compute full price vs deposit
        const prod = products.find(p => p.name === data.product_name);
        setOriginalProduct(prod);

      } catch (err: any) {
        setError(err.message || 'Order not found');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId, products]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      const supabase = getSupabase();
      
      // Update status to processing and log the payment
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'processing', 
          product_variant: (order.product_variant || '').replace('PreOrder', 'Balance Paid')
        })
        .eq('id', orderId);

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      console.error("Error updating order:", err);
      setError("Failed to process payment. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Oops!</h2>
        <p className="text-gray-500">{error || 'Order not found.'}</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Return Home
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Payment Successful</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            Thank you for completing your pre-order payment, {order.customer_name}! Your payment details have been saved, and we will dispatch your model within 48hrs.
          </p>
          <button onClick={() => navigate('/')} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
            Go back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  // Calculate mock balance
  const itemFullPrice = originalProduct?.fullPrice || (originalProduct?.price ? originalProduct.price * 2 : 2500); 
  const depositPaid = order.quantity * (originalProduct?.price || 500);
  const remainingBalance = itemFullPrice * order.quantity - depositPaid;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">Complete Pre-Order</h1>
        <p className="text-gray-500">Pay your final balance below to receive your item.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Order Details */}
        <div className="bg-white p-8 rounded-2xl border border-[#e5e5e7] shadow-sm flex flex-col h-full">
          <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-6 pb-4 border-b">Order Summary</h3>
          <div className="flex-grow space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{order.product_name}</p>
                <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
              <p>Total Item Price</p>
              <p>₹{itemFullPrice * order.quantity}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <p>Deposit Paid</p>
              <p>-₹{depositPaid}</p>
            </div>
            
          </div>
          <div className="pt-6 border-t mt-6 flex justify-between items-center">
             <p className="font-bold text-gray-900 uppercase tracking-wider text-sm">Remaining Balance</p>
             <p className="font-black text-2xl text-blue-600">₹{remainingBalance > 0 ? remainingBalance : 1500}</p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white p-8 rounded-2xl border border-[#e5e5e7] shadow-sm">
           <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
             <CreditCard className="w-4 h-4 text-gray-400" /> Payment Details
           </h3>

           <form onSubmit={handlePayment} className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Number</label>
               <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-mono" required />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expiry Date</label>
                 <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-mono" required />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CVV</label>
                 <input type="text" placeholder="123" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-mono" required />
               </div>
             </div>
             <div className="pt-4">
               <button 
                 type="submit" 
                 disabled={processing}
                 className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-gray-800 transition shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
               >
                 {processing ? (
                   <>
                     <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                   </>
                 ) : (
                   <>
                     <Lock className="w-4 h-4" /> Pay Balance
                   </>
                 )}
               </button>
             </div>
           </form>
        </div>
      </div>
    </div>
  );
};
