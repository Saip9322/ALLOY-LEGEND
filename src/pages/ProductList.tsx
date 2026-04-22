import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

export const ProductList: React.FC = () => {
  const { products: allProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const initialBrand = searchParams.get('brand') || '';
  const initialSearch = searchParams.get('search') || '';
  
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedScale, setSelectedScale] = useState('');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setSelectedBrand(searchParams.get('brand') || '');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-racing-red animate-spin" />
      </div>
    );
  }

  const brands = Array.from(new Set(allProducts.map(p => p.brand)));
  const scales = Array.from(new Set(allProducts.map(p => p.scale)));

  const filteredProducts = allProducts.filter(product => {
    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
    const matchesScale = selectedScale ? product.scale === selectedScale : true;
    const matchesSearch = searchQuery 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesBrand && matchesScale && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // featured/default
  });

  const clearFilters = () => {
    setSelectedBrand('');
    setSelectedScale('');
    setSearchQuery('');
    setSearchParams({});
  };

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <h1 className="text-[28px] font-black uppercase tracking-[2px] mb-2 text-white">
              {searchQuery ? `Search: ${searchQuery}` : selectedBrand ? `${selectedBrand} Models` : 'All Models'}
            </h1>
            <p className="text-gray-500 text-[13px] font-mono">Found {filteredProducts.length} precision units</p>
          </motion.div>
          
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center justify-center bg-slate-dark border border-slate-border px-6 py-3 rounded-full flex-1 text-[11px] font-bold uppercase tracking-[2px] text-white"
            >
              <Filter className="h-4 w-4 mr-2 text-racing-red" /> Filters
            </button>
            
            <div className="relative flex-1 md:w-64">
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
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <Filter className="h-3 w-3" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className={`md:w-72 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-slate-dark border border-slate-border rounded-2xl p-8 sticky top-24"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[14px] font-black uppercase tracking-[2px] text-white">Filters</h2>
                {(selectedBrand || selectedScale || searchQuery) && (
                  <button onClick={clearFilters} className="text-[10px] text-racing-red hover:text-white uppercase font-bold tracking-[1px] transition-colors">
                    Reset
                  </button>
                )}
              </div>

              <div className="mb-10">
                <h3 className="text-[10px] font-black uppercase text-gray-600 mb-5 tracking-[3px]">Brand</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="brand" 
                        checked={selectedBrand === ''}
                        onChange={() => setSelectedBrand('')}
                        className="w-4 h-4 text-racing-red bg-midnight border-slate-border focus:ring-racing-red focus:ring-offset-midnight transition-all"
                      />
                      <span className="ml-4 text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors">All Brands</span>
                    </div>
                  </label>
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="brand" 
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(brand)}
                          className="w-4 h-4 text-racing-red bg-midnight border-slate-border focus:ring-racing-red focus:ring-offset-midnight transition-all"
                        />
                        <span className="ml-4 text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors">{brand}</span>
                      </div>
                      <span className="text-gray-600 text-[11px] font-mono">
                        {allProducts.filter(p => p.brand === brand).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black uppercase text-gray-600 mb-5 tracking-[3px]">Scale</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="scale" 
                        checked={selectedScale === ''}
                        onChange={() => setSelectedScale('')}
                        className="w-4 h-4 text-racing-red bg-midnight border-slate-border focus:ring-racing-red focus:ring-offset-midnight transition-all"
                      />
                      <span className="ml-4 text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors">All Scales</span>
                    </div>
                  </label>
                  {scales.map(scale => (
                    <label key={scale} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="scale" 
                          checked={selectedScale === scale}
                          onChange={() => setSelectedScale(scale)}
                          className="w-4 h-4 text-racing-red bg-midnight border-slate-border focus:ring-racing-red focus:ring-offset-midnight transition-all"
                        />
                        <span className="ml-4 text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors">{scale}</span>
                      </div>
                      <span className="text-gray-600 text-[11px] font-mono">
                        {allProducts.filter(p => p.scale === scale).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <motion.div 
                key={`${selectedBrand}-${selectedScale}-${searchQuery}-${sortBy}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => (
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
                <p className="text-[16px] text-gray-500 mb-8">No models found matching your criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="racing-gradient text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[2px] transition-all hover:scale-105"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
