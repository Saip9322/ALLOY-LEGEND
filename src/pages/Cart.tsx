import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[70vh] bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-4"
      >
        <ShoppingBag className="h-20 w-20 text-gray-500 mb-6" />
        <h1 className="text-[24px] font-bold mb-4 uppercase tracking-[1px]">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md text-[14px]">
          Looks like you haven't added any models to your collection yet.
        </p>
        <Link 
          to="/products"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold uppercase tracking-[1px] text-[12px] transition-colors"
        >
          Start Shopping
        </Link>
      </motion.div>
    );
  }

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
          className="text-[28px] font-black uppercase tracking-[2px] mb-12 text-white"
        >
          Shopping <span className="text-racing-red">Cart</span>
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-slate-dark border border-slate-border rounded-2xl overflow-hidden shadow-xl">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-slate-border text-[10px] font-black text-gray-500 uppercase tracking-[3px]">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
                <div className="col-span-1"></div>
              </div>

              <div className="divide-y divide-slate-border/50">
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 sm:grid sm:grid-cols-12 gap-4 items-center flex flex-col"
                    >
                      <div className="col-span-5 flex items-center gap-6 w-full">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-24 h-24 object-contain rounded-xl bg-midnight border border-slate-border"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <Link to={`/product/${item.id}`} className="font-bold text-[15px] text-white hover:text-racing-red transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          <div className="text-[11px] font-bold text-gray-500 mt-2 uppercase tracking-[1px]">{item.brand} • {item.scale}</div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[11px] font-bold text-racing-red hover:text-white mt-3 flex items-center sm:hidden uppercase tracking-[1px] transition-colors"
                          >
                            <Trash2 className="h-4 w-4 mr-1.5" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-2 text-center w-full sm:w-auto flex justify-between sm:block mt-4 sm:mt-0 text-[14px] font-sans tabular-nums tracking-tight">
                        <span className="sm:hidden text-gray-500 uppercase font-sans text-[11px] font-bold">Price:</span>
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      
                      <div className="col-span-2 flex justify-center w-full sm:w-auto mt-4 sm:mt-0">
                        <div className="flex items-center border border-slate-border rounded-full bg-midnight px-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                          >
                            -
                          </button>
                          <motion.span 
                            key={item.quantity}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-8 text-center text-[13px] font-black text-white"
                          >
                            {item.quantity}
                          </motion.span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-2 flex justify-between sm:justify-end items-center w-full sm:w-auto mt-4 sm:mt-0">
                        <span className="sm:hidden text-gray-500 uppercase font-sans text-[11px] font-bold">Total:</span>
                        <motion.span 
                          key={item.quantity * item.price}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="font-black text-[16px] text-white font-sans tabular-nums tracking-tight"
                        >
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </motion.span>
                      </div>
                      
                      <div className="col-span-1 flex justify-end items-center w-full sm:w-auto mt-4 sm:mt-0">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-600 hover:text-racing-red transition-colors hidden sm:block"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-96"
          >
            <div className="bg-slate-dark border border-slate-border rounded-2xl p-8 sticky top-24 shadow-xl">
              <h2 className="text-[14px] font-black uppercase tracking-[2px] mb-8 text-white">Order Summary</h2>
              
              <div className="space-y-5 mb-8 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase tracking-[1px]">Subtotal</span>
                  <motion.span 
                    key={totalPrice}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-sans tabular-nums tracking-tight text-white"
                  >
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </motion.span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase tracking-[1px]">Shipping</span>
                  <span className="font-sans tabular-nums tracking-tight text-white">₹150</span>
                </div>
                <div className="border-t border-slate-border pt-6 flex flex-col items-end gap-2">
                  <span className="text-white font-black uppercase tracking-[1px]">Est. Total</span>
                  <motion.span 
                    key={totalPrice + 150}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[32px] font-black text-racing-red leading-none font-sans tabular-nums tracking-tight"
                  >
                    ₹{(totalPrice + 150).toLocaleString('en-IN')}
                  </motion.span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full racing-gradient text-white py-4 rounded-full font-black uppercase tracking-[2px] text-[12px] transition-all hover:scale-105 shadow-xl shadow-racing-red/20 flex items-center justify-center"
              >
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              <div className="mt-6 text-center">
                <Link to="/products" className="text-[11px] font-bold text-gray-500 hover:text-white uppercase tracking-[1px] transition-colors">
                  or Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
