import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

export const PreOrders: React.FC = () => {
  const { products: allProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-racing-red animate-spin" />
      </div>
    );
  }

  const preOrderProducts = allProducts.filter(product => product.isPreOrder && !product.hidden)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured/default
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-midnight text-gray-100 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 text-center md:text-left">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <h1 className="text-[32px] md:text-[40px] font-black uppercase tracking-[4px] mb-4 text-white">
              Limited <span className="text-racing-red">Pre-Orders</span>
            </h1>
            <p className="text-gray-400 text-[14px] font-mono max-w-xl mx-auto md:mx-0">
              Secure the most anticipated releases before they hit the shelves. 
            </p>
          </motion.div>
          
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="w-full md:w-auto">
            <div className="relative md:w-64">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-dark border border-slate-border text-gray-300 px-6 py-3 rounded-full focus:outline-none focus:border-racing-red appearance-none text-[11px] font-bold uppercase tracking-[2px] cursor-pointer hover:border-racing-red transition-colors"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div>
          {preOrderProducts.length > 0 ? (
            <motion.div 
              key={sortBy}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {preOrderProducts.map(product => (
                  <motion.div 
                    key={product.id} 
                    variants={itemVariants}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="bg-slate-dark border border-slate-border rounded-2xl p-20 text-center"
            >
              <p className="text-[16px] text-gray-500 mb-8">No pre-order models currently available. Check back soon!</p>
            </motion.div>
          )}
        </div>

        {/* Benefits Banner */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-slate-dark/50 p-8 rounded-2xl border border-white/5 text-center">
            <h3 className="text-white font-black text-[14px] uppercase tracking-[2px] mb-3">Priority Delivery</h3>
            <p className="text-gray-500 text-[12px]">Be the first to receive new releases directly from the factory.</p>
          </div>
          <div className="bg-slate-dark/50 p-8 rounded-2xl border border-white/5 text-center border-racing-red/20">
            <h3 className="text-racing-red font-black text-[14px] uppercase tracking-[2px] mb-3">Shipping Later</h3>
            <p className="text-gray-400 text-[12px] font-bold">* Shipping charges will be calculated when the product arrives.</p>
          </div>
          <div className="bg-slate-dark/50 p-8 rounded-2xl border border-white/5 text-center">
            <h3 className="text-white font-black text-[14px] uppercase tracking-[2px] mb-3">Guaranteed Stock</h3>
            <p className="text-gray-500 text-[12px]">Secure highly sought-after units that typically sell out within minutes.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
