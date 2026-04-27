import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

export const Home: React.FC = () => {
  const { products: allProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const newArrivals = allProducts.filter(p => p.newArrival && !p.hidden).slice(0, 5);

  useEffect(() => {
    if (newArrivals.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [newArrivals.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-racing-red animate-spin" />
      </div>
    );
  }

  const featuredProducts = allProducts.filter(p => p.featured && !p.hidden).slice(0, 4);
  const trendingProducts = allProducts.filter(p => p.trending && !p.hidden).slice(0, 4);

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
      {/* Hero Section - New Arrivals Slider */}
      <div className="relative h-[650px] sm:h-[700px] lg:h-[750px] overflow-hidden border-b border-slate-border">
        <AnimatePresence mode="wait">
          {newArrivals.map((product, index) => (
            index === currentSlide && (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 carbon-pattern"
              >
                {/* Background Pattern mask */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-midnight/20 via-midnight/50 to-midnight"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
                  {/* Text Content */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex-1 text-center lg:text-left pt-20 lg:pt-0"
                  >
                    <p className="text-racing-red font-bold uppercase text-[11px] mb-4 tracking-[4px] bg-racing-red/10 px-3 py-1 rounded inline-block">New Arrival</p>
                    <h1 className="text-[36px] sm:text-[54px] lg:text-[68px] leading-[1.1] mb-6 font-black text-white uppercase tracking-tighter">
                      {product.name.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 === 0 ? "" : "text-racing-red"}>{word} </span>
                      ))}
                    </h1>
                    <p className="text-gray-300 max-w-[500px] mx-auto lg:mx-0 text-[16px] sm:text-[18px] mb-10 leading-relaxed font-medium">
                      {product.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                      <Link 
                        to={`/product/${product.id}`}
                        className="racing-gradient text-white px-10 py-4 font-black rounded-full text-[13px] uppercase tracking-[2px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-racing-red/25"
                      >
                        Discover Model
                      </Link>
                      <div className="flex flex-col justify-center border-l lg:border-white/10 pl-5">
                        <span className="text-gray-500 text-[10px] uppercase tracking-[2px] mb-1">Scale 1:64</span>
                        <span className="text-white font-black text-[24px]">₹{product.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Product Image */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0, x: 50 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex-1 flex justify-center items-center h-full max-w-[500px] lg:max-w-none"
                  >
                    <div className="relative group">
                      <div className="absolute -inset-10 bg-racing-red/10 blur-[80px] rounded-full group-hover:bg-racing-red/20 transition-all duration-700"></div>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="relative w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.8)] hover:scale-110 transition-transform duration-700 pointer-events-none"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0 z-20 flex gap-3">
          {newArrivals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${index === currentSlide ? 'w-12 bg-racing-red' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute right-10 bottom-10 z-20 flex gap-4">
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + newArrivals.length) % newArrivals.length)}
            className="p-4 bg-midnight/80 border border-white/10 rounded-full hover:border-racing-red transition-all text-white backdrop-blur-md active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % newArrivals.length)}
            className="p-4 bg-midnight/80 border border-white/10 rounded-full hover:border-racing-red transition-all text-white backdrop-blur-md active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* New Arrivals Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-slate-border">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
        >
          <div>
            <h2 className="text-[32px] font-black uppercase tracking-[2px] mb-2 text-white">Latest <span className="text-racing-red">Arrivals</span></h2>
            <p className="text-gray-500 text-[14px] font-medium tracking-wide">Freshly unboxed and ready for your collection.</p>
          </div>
          <Link to="/products" className="flex items-center text-racing-red hover:text-white text-[13px] font-bold uppercase tracking-[2px] transition-colors group">
            Browse All New Stock <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {newArrivals.map(product => (
            <motion.div key={product.id} variants={itemVariants} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-dark/50 border border-slate-border group-hover:border-racing-red transition-all duration-500">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-racing-red text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  New
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <Link 
                    to={`/product/${product.id}`}
                    className="w-full py-3 bg-white text-midnight text-center font-black rounded-lg text-[11px] uppercase tracking-[2px] hover:bg-racing-red hover:text-white transition-colors"
                  >
                    Quick View
                  </Link>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-white font-bold text-[16px] mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[12px] font-medium">{product.brand}</span>
                  <span className="text-racing-red font-black">₹{product.price.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

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

      {/* Pre-Order CTA Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="relative overflow-hidden rounded-[32px] bg-slate-dark border border-slate-border group">
          <div className="absolute inset-0 carbon-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-racing-red/20 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-16 gap-10">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-4 py-1 bg-racing-red text-white text-[10px] font-black uppercase tracking-[3px] rounded-full mb-6 shadow-lg shadow-racing-red/20">Active Collection</span>
              <h2 className="text-[36px] md:text-[54px] font-black uppercase leading-none mb-6 text-white tracking-tighter">
                Secure Your <span className="text-racing-red">Pre-Orders</span>
              </h2>
              <p className="text-gray-400 text-[16px] max-w-xl mb-10 font-medium leading-relaxed">
                Be the first to own exclusive limited-edition releases. 
                <span className="block mt-2 font-bold text-gray-300 text-[13px]">* Shipping charges will be calculated when the product arrives.</span>
              </p>
              <Link 
                to="/pre-orders"
                className="inline-flex items-center gap-3 bg-white text-midnight px-10 py-4 font-black rounded-full text-[13px] uppercase tracking-[2px] transition-all hover:scale-105 hover:bg-racing-red hover:text-white group"
              >
                Browse Pre-Orders <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-[400px]">
                <div className="absolute inset-0 bg-racing-red/20 blur-[60px] rounded-full"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=800&auto=format&fit=crop" 
                  alt="Pre Order Preview" 
                  className="relative w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform -rotate-12 group-hover:rotate-0 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
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
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {['MiniGT', 'Inno64', 'Tarmac Works', 'Hotwheels Mainline', 'Hot wheels RLC', 'Elite64', 'CM models', 'PreOrder', 'Miscellaneous'].map((brand) => (
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
