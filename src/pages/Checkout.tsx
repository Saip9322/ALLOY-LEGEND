import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { getSupabase } from '../lib/supabase';

export const Checkout: React.FC = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { reduceStock } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.email ? user.email.split('@')[0] : '',
    lastName: '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    address: user?.user_metadata?.address || '',
    landmark: user?.user_metadata?.landmark || '',
    city: user?.user_metadata?.city || '',
    state: user?.user_metadata?.state || '',
    zipCode: user?.user_metadata?.zip || '',
    country: 'India',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !isSubmitted) {
      navigate('/cart');
    }
  }, [items, navigate, isSubmitted]);

  if (items.length === 0 && !isSubmitted) {
    return null;
  }

  const hasPreOrder = items.some(item => item.isPreOrder);
  const shipping = hasPreOrder ? 0 : 150; // Free if pre-order, otherwise Flat shipping in INR
  const tax = 0; 
  const finalTotal = totalPrice + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBanner(null);

    if (!validate()) {
      setBanner({ type: 'error', message: 'Please fix the errors in the form.' });
      return;
    }

    setIsProcessing(true);
    
    try {
      const supabase = getSupabase();
      
      const ordersToInsert = items.map(item => ({
        customer_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        address: `${formData.address}${formData.landmark ? `, Near: ${formData.landmark}` : ''}, ${formData.city}, ${formData.state} - ${formData.zipCode}, ${formData.country}`,
        product_name: item.name,
        product_variant: item.isPreOrder ? `PreOrder - ${item.brand}` : item.brand,
        quantity: item.quantity,
        status: "pending"
      }));

      const { error } = await supabase
        .from('orders')
        .insert(ordersToInsert);

      if (error) throw error;

      // Reduce stock locally in the product context
      items.forEach(item => {
        reduceStock(item.id, item.quantity);
      });

      setBanner({ type: 'success', message: 'Your order has been placed successfully!' });
      
      // Simulate confirmation redirect
      setTimeout(() => {
        const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
        const orderState = { 
          orderId,
          total: finalTotal,
          subtotal: totalPrice,
          shipping,
          tax,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          items: items
        };

        setIsProcessing(false);
        setIsSubmitted(true);
        clearCart();
        navigate('/order-confirmation', { state: orderState });
      }, 1500);

    } catch (err: any) {
      console.error('Supabase error:', err);
      let message = 'An error occurred while processing your order. Please try again.';
      
      if (err?.code === '42501') {
        message = 'Database Security Error: "orders" table is missing an INSERT policy. Please run the SQL command provided in the chat to fix this.';
      }

      setBanner({ type: 'error', message });
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-midnight text-gray-100 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[28px] font-black uppercase tracking-[2px] mb-8 text-white"
        >
          Checkout
        </motion.h1>

        <AnimatePresence>
          {banner && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 p-4 rounded-xl flex items-center gap-3 border ${
                banner.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/50 text-green-500' 
                  : 'bg-red-500/10 border-red-500/50 text-racing-red'
              }`}
            >
              {banner.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="text-[13px] font-bold uppercase tracking-[1px]">{banner.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
              
              {/* Contact Information */}
              <div className="bg-slate-dark border border-slate-border rounded-2xl p-8 shadow-xl">
                <h2 className="text-[14px] font-black uppercase tracking-[2px] mb-8 text-white border-b border-slate-border pb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.firstName ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.firstName && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.firstName}</span>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.lastName ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.lastName && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.lastName}</span>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.email ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.email && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.email}</span>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.phone ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.phone && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-slate-dark border border-slate-border rounded-2xl p-8 shadow-xl">
                <h2 className="text-[14px] font-black uppercase tracking-[2px] mb-8 text-white border-b border-slate-border pb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Street Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.address ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.address && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.address}</span>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Landmark (Optional)</label>
                    <input 
                      type="text" 
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="e.g. Near Apollo Hospital"
                      className="w-full bg-midnight border border-slate-border rounded-lg px-5 py-3 focus:outline-none focus:border-racing-red text-[14px] text-white placeholder:text-gray-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.city ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.city && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.city}</span>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">State</label>
                    <select 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none text-[14px] text-white cursor-pointer transition-colors ${errors.state ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    {errors.state && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.state}</span>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">ZIP / Postal Code</label>
                    <input 
                      type="text" 
                      name="zipCode"
                      placeholder="6-digit PIN"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.zipCode ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.zipCode && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.zipCode}</span>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Country</label>
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-midnight border border-slate-border rounded-lg px-5 py-3 focus:outline-none focus:border-racing-red text-[14px] text-white cursor-not-allowed transition-colors"
                      disabled
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 mt-4">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Order Notes (Optional)</label>
                    <textarea 
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions for your delivery?"
                      className="w-full bg-midnight border border-slate-border rounded-lg px-5 py-3 focus:outline-none focus:border-racing-red text-[14px] text-white placeholder:text-gray-700 transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-slate-dark border border-slate-border rounded-2xl p-8 shadow-xl">
                <div className="flex items-center mb-8 border-b border-slate-border pb-4">
                  <CreditCard className="h-5 w-5 text-racing-red mr-3" />
                  <h2 className="text-[14px] font-black uppercase tracking-[2px] text-white">Payment Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Name on Card</label>
                    <input 
                      type="text" 
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.nameOnCard ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.nameOnCard && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.nameOnCard}</span>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none font-mono text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.cardNumber ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.cardNumber && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.cardNumber}</span>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">Expiry Date</label>
                    <input 
                      type="text" 
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none font-mono text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.expiryDate ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.expiryDate && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.expiryDate}</span>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-2">CVV</label>
                    <input 
                      type="text" 
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={`w-full bg-midnight border rounded-lg px-5 py-3 focus:outline-none font-mono text-[14px] text-white placeholder:text-gray-700 transition-colors ${errors.cvv ? 'border-racing-red' : 'border-slate-border focus:border-racing-red'}`}
                    />
                    {errors.cvv && <span className="text-[10px] text-racing-red mt-1 block font-bold uppercase tracking-[1px]">{errors.cvv}</span>}
                  </div>
                </div>
                <div className="mt-8 flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-[1px]">
                  <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                  Payments are secure and encrypted.
                </div>
              </div>
            </form>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-96"
          >
            <div className="bg-slate-dark border border-slate-border rounded-2xl p-8 sticky top-24 shadow-xl">
              <h2 className="text-[14px] font-black uppercase tracking-[2px] mb-8 text-white">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-80 overflow-y-auto pr-3 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-5">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-contain rounded-lg bg-midnight border border-slate-border" 
                        referrerPolicy="no-referrer"
                      />
                      {item.isPreOrder && (
                        <div className="absolute -top-1 -left-1 bg-racing-red text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-lg z-10">
                          Pre-Order
                        </div>
                      )}
                      <span className="absolute -top-2 -right-2 bg-racing-red text-white text-[9px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 text-[13px]">
                      <div className="font-bold text-white line-clamp-2 leading-tight mb-1">{item.name}</div>
                      <div className="text-gray-500 font-sans tabular-nums tracking-tight">₹{item.price.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 text-[13px] border-t border-slate-border pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase tracking-[1px]">Subtotal</span>
                  <span className="text-white font-sans tabular-nums tracking-tight">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase tracking-[1px]">Shipping</span>
                  <span className="text-white font-sans tabular-nums tracking-tight">
                    {hasPreOrder ? (
                      <span className="text-racing-red font-black text-[12px] uppercase">* Calculated at Arrival</span>
                    ) : (
                      `₹${shipping.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>
                <div className="border-t border-slate-border pt-6 flex flex-col items-end gap-2">
                  <span className="text-white font-black uppercase tracking-[1px]">Total</span>
                  <span className="text-[32px] font-black text-racing-red leading-none font-sans tabular-nums tracking-tight">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <button 
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full racing-gradient text-white py-4 rounded-full font-black uppercase tracking-[2px] text-[12px] transition-all hover:scale-105 shadow-xl shadow-racing-red/20 flex items-center justify-center disabled:opacity-50 disabled:scale-100"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : `Pay ₹${finalTotal.toLocaleString('en-IN')}`}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
