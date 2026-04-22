import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

export const Home: React.FC = () => {
  const { products: allProducts } = useProducts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const featuredProducts = allProducts.filter(p => p.featured).slice(0, 4);
  const trendingProducts = allProducts.filter(p => p.trending).slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-midnight text-gray-100"
    >
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-[400px] bg-midnight p-10 flex flex-col justify-center border-b border-slate-border relative overflow-hidden carbon-pattern"
      >
        <div className="absolute inset-0 z-0 opacity-40 bg-gradient-to-b from-transparent to-midnight"></div>
        
        <motion.div 
          variants={containerVariants}
          className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"
        >
          <motion.p variants={itemVariants} className="text-racing-red font-bold uppercase text-[11px] mb-3 tracking-[3px]">New Arrival / 2024 Series</motion.p>
          <motion.h1 variants={itemVariants} className="text-[36px] sm:text-[72px] leading-[0.9] mb-4 font-black text-white uppercase tracking-tight">
            Precision<br /><span className="text-racing-red">Performance</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-[450px] text-[15px] mb-8 leading-relaxed">
            Curated collection of premium 1:64 scale diecast models. Engineered for the true automotive enthusiast.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link 
              to="/products" 
              className="racing-gradient text-white px-8 py-3.5 font-bold rounded-full text-[12px] uppercase tracking-[2px] hover:scale-105 transition-transform shadow-lg shadow-racing-red/20"
            >
              Shop Collection
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="border-b border-slate-border bg-slate-dark/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div variants={itemVariants} className="flex flex-col items-center group">
              <div className="bg-midnight p-4 rounded-full border border-slate-border mb-4 group-hover:border-racing-red transition-colors">
                <ShieldCheck className="h-6 w-6 text-racing-red" />
              </div>
              <h3 className="text-[13px] font-bold uppercase tracking-[2px] mb-2 text-white">Authentic Models</h3>
              <p className="text-gray-500 text-[12px] max-w-[200px]">100% genuine products from official manufacturers.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center group">
              <div className="bg-midnight p-4 rounded-full border border-slate-border mb-4 group-hover:border-racing-red transition-colors">
                <Truck className="h-6 w-6 text-racing-red" />
              </div>
              <h3 className="text-[13px] font-bold uppercase tracking-[2px] mb-2 text-white">Secure Shipping</h3>
              <p className="text-gray-500 text-[12px] max-w-[200px]">Carefully packaged to ensure mint condition arrival.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center group">
              <div className="bg-midnight p-4 rounded-full border border-slate-border mb-4 group-hover:border-racing-red transition-colors">
                <RotateCcw className="h-6 w-6 text-racing-red" />
              </div>
              <h3 className="text-[13px] font-bold uppercase tracking-[2px] mb-2 text-white">No Returns & Refunds</h3>
              <p className="text-gray-500 text-[12px] max-w-[200px]">No returns or refunds are accepted once the order is placed.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Brand Showcase */}
      <div className="bg-slate-dark/30 py-20 border-y border-slate-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[20px] font-black uppercase tracking-[2px] mb-12 text-center text-white"
          >
            Shop by <span className="text-racing-red">Brand</span>
          </motion.h2>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {['MiniGT', 'Inno64', 'Tarmac Works', 'Hotwheels Mainline', 'Hot wheels RLC', 'Elite64', 'CM models'].map((brand) => (
              <motion.div key={brand} variants={itemVariants} whileHover={{ y: -5 }}>
                <Link 
                  to={`/products?brand=${brand}`}
                  className="bg-midnight border border-slate-border hover:border-racing-red p-8 flex items-center justify-center rounded-xl transition-all h-full"
                >
                  <span className="text-[13px] font-black uppercase tracking-[3px] text-gray-500 hover:text-white transition-colors text-center block w-full">
                    {brand}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-[24px] font-black uppercase tracking-[2px] mb-2 text-white">Featured <span className="text-racing-red">Models</span></h2>
            <p className="text-gray-500 text-[13px]">Handpicked selections for the true collector.</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center text-racing-red hover:text-white text-[12px] font-bold uppercase tracking-[2px] transition-colors group">
            View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {featuredProducts.map(product => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Trending Now */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-[24px] font-black uppercase tracking-[2px] mb-2 text-white">Trending <span className="text-racing-red">Now</span></h2>
            <p className="text-gray-500 text-[13px]">The most sought-after models this week.</p>
          </div>
        </motion.div>
        
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {trendingProducts.map(product => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
