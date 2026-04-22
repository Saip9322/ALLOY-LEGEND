import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Check, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById } = useProducts();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    const foundProduct = getProductById(id);
    setProduct(foundProduct || null);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id, getProductById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-racing-red animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-4">
        <h1 className="text-[24px] font-bold mb-4 uppercase tracking-[1px]">Product Not Found</h1>
        <p className="text-gray-500 mb-8 text-[14px]">The model you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/products')}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold uppercase tracking-[1px] text-[12px] transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-midnight text-gray-100 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-white mb-8 transition-colors text-[13px] font-bold uppercase tracking-[2px] group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Shop
        </Link>

        <div className="bg-slate-dark border border-slate-border rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Image */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative aspect-square md:aspect-auto md:h-full bg-midnight"
            >
              <motion.img 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain opacity-90"
                referrerPolicy="no-referrer"
              />
              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-midnight/80 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-black text-[24px] uppercase tracking-[4px] border-4 border-racing-red text-racing-red px-8 py-4 rounded-xl">Sold Out</span>
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="p-10 md:p-16 flex flex-col justify-center"
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-6 mb-6"
              >
                <span className="bg-racing-red/10 text-racing-red px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[2px] border border-racing-red/20">
                  {product.brand}
                </span>
                <span className="text-gray-500 font-mono text-[12px] tracking-wider">
                  SCALE: {product.scale}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[32px] md:text-[48px] font-black mb-6 leading-[1.1] uppercase tracking-tight text-white"
              >
                {product.name}
              </motion.h1>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[36px] font-black text-racing-red mb-8 tracking-tighter tabular-nums"
              >
                ₹{product.price.toLocaleString('en-IN')}
              </motion.div>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 mb-10 leading-relaxed text-[15px]"
              >
                {product.description}
              </motion.p>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-10"
              >
                <h3 className="font-black mb-3 text-gray-500 uppercase tracking-[3px] text-[10px]">Availability</h3>
                {product.stock > 0 ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-green-500 text-[13px] font-bold">
                      <Check className="h-4 w-4 mr-2" /> In Stock / Ready for Shipment
                    </div>
                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-[1px] ml-6">
                      {product.stock} units available
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-racing-red text-[13px] font-bold">
                    <AlertCircle className="h-4 w-4 mr-2" /> Out of Stock / Restocking Soon
                  </div>
                )}
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-6 mt-auto"
              >
                <div className="flex items-center border border-slate-border rounded-full bg-midnight w-36 px-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    disabled={product.stock <= 0}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-[14px] text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    disabled={product.stock <= 0 || quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 flex items-center justify-center px-10 py-4 rounded-full font-black uppercase tracking-[2px] text-[12px] transition-all shadow-xl ${
                    isAdded 
                      ? 'bg-green-600 text-white' 
                      : product.stock > 0 
                        ? 'racing-gradient text-white hover:scale-105 shadow-racing-red/20' 
                        : 'bg-slate-border text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4 mr-2" /> Added to Garage
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
