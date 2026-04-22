import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, MapPin, CreditCard } from 'lucide-react';
import { Product } from '../data/products';

interface OrderState {
  orderId: string;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  items: (Product & { quantity: number })[];
}

export const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const state = location.state as OrderState | null;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-midnight text-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-dark border border-slate-border rounded-3xl p-10 md:p-16 mb-8 text-center shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="bg-green-500/10 p-6 rounded-full border border-green-500/20">
              <CheckCircle className="h-24 w-24 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-[36px] md:text-[48px] font-black uppercase tracking-[2px] mb-4 text-white">Order <span className="text-racing-red">Confirmed!</span></h1>
          <p className="text-[22px] font-bold text-white mb-4">Thank you for your purchase, {state.firstName}!</p>
          <p className="text-gray-500 text-[15px] mb-12 max-w-2xl mx-auto leading-relaxed">
            Your high-performance models are being prepared for shipment. We've sent a detailed receipt and tracking information to <span className="font-bold text-racing-red">{state.email}</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
            {/* Order Details */}
            <div className="bg-midnight border border-slate-border rounded-2xl p-8">
              <div className="flex items-center mb-6 text-white">
                <Package className="h-5 w-5 mr-3 text-racing-red" />
                <span className="font-black uppercase tracking-[2px] text-[12px]">Order Summary</span>
              </div>
              
              <div className="space-y-4 text-[13px]">
                <div className="flex justify-between border-b border-slate-border/50 pb-3">
                  <span className="text-gray-500 font-bold uppercase tracking-[1px]">Order ID</span>
                  <span className="font-sans tabular-nums tracking-tight text-white font-bold">{state.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-border/50 pb-3">
                  <span className="text-gray-500 font-bold uppercase tracking-[1px]">Subtotal</span>
                  <span className="font-sans tabular-nums tracking-tight text-white">₹{state.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-slate-border/50 pb-3">
                  <span className="text-gray-500 font-bold uppercase tracking-[1px]">Shipping</span>
                  <span className="font-sans tabular-nums tracking-tight text-white">₹{state.shipping.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex flex-col items-end gap-2 pt-4">
                  <span className="font-black uppercase tracking-[2px] text-white">Total</span>
                  <span className="font-black text-[32px] text-racing-red font-sans tabular-nums tracking-tight leading-none">₹{state.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-midnight border border-slate-border rounded-2xl p-8">
              <div className="flex items-center mb-6 text-white">
                <MapPin className="h-5 w-5 mr-3 text-racing-red" />
                <span className="font-black uppercase tracking-[2px] text-[12px]">Shipping Address</span>
              </div>
              
              <div className="text-[14px] text-gray-400 space-y-2 font-medium">
                <p className="font-black text-white text-[16px] mb-3">{state.firstName} {state.lastName}</p>
                <p>{state.address}</p>
                <p>{state.city}, {state.state} {state.zipCode}</p>
                <p className="text-gray-500 uppercase tracking-[1px] font-bold text-[12px] mt-4">{state.country}</p>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-midnight border border-slate-border rounded-2xl p-8 text-left mb-12">
            <div className="flex items-center mb-8 text-white">
              <Package className="h-5 w-5 mr-3 text-racing-red" />
              <span className="font-black uppercase tracking-[2px] text-[12px]">Items Ordered</span>
            </div>
            
            <div className="divide-y divide-slate-border/30">
              {state.items.map((item) => (
                <div key={item.id} className="py-6 flex gap-6 items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-contain rounded-xl border border-slate-border bg-slate-dark" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <h4 className="text-[15px] font-bold text-white line-clamp-1 mb-1">{item.name}</h4>
                    <p className="text-[11px] font-black text-gray-500 uppercase tracking-[1px] mb-2">{item.brand} • {item.scale}</p>
                    <p className="text-[12px] text-gray-600 line-clamp-2 italic">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-black text-white font-sans tabular-nums tracking-tight">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[1px] mt-1">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="inline-flex items-center justify-center bg-slate-dark border border-slate-border text-white px-12 py-4 rounded-full font-black uppercase tracking-[2px] text-[12px] transition-all hover:bg-slate-border shadow-xl w-full sm:w-auto"
            >
              Return to Home
            </Link>
            <Link 
              to="/products"
              className="inline-flex items-center justify-center racing-gradient text-white px-12 py-4 rounded-full font-black uppercase tracking-[2px] text-[12px] transition-all hover:scale-105 shadow-xl shadow-racing-red/20 w-full sm:w-auto"
            >
              Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
