import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-slate-dark border border-slate-border p-5 flex flex-col sm:flex-row gap-6 relative hover:border-racing-red transition-all duration-500 h-full rounded-xl overflow-hidden"
    >
      {/* Status Tag */}
      {product.stock > 0 ? (
        <span className="absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full uppercase z-10 border border-green-500/20">In Stock</span>
      ) : (
        <span className="absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 bg-racing-red/10 text-racing-red rounded-full uppercase z-10 border border-racing-red/20">Sold Out</span>
      )}
      {product.trending && product.stock > 0 && (
        <span className="absolute top-4 left-4 text-[9px] font-bold px-2 py-0.5 bg-yellow-500/10 text-yellow-500 rounded-full uppercase z-10 border border-yellow-500/20">Trending</span>
      )}

      <Link to={`/product/${product.id}`} className="w-full sm:w-[140px] h-[180px] sm:h-[120px] bg-midnight rounded-lg flex-shrink-0 border border-slate-border overflow-hidden block">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
      </Link>
      
      <div className="flex flex-col flex-grow justify-center">
        <span className="text-racing-red text-[10px] uppercase font-black tracking-[2px] mb-2 block">{product.brand}</span>
        <Link to={`/product/${product.id}`} className="block mb-3 flex-grow">
          <h4 className="text-[17px] text-white font-bold leading-tight group-hover:text-racing-red transition-colors line-clamp-2">
            {product.name}
          </h4>
        </Link>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-border/50">
          <p className="font-black text-[20px] text-white tracking-tight tabular-nums">₹{product.price.toLocaleString('en-IN')}</p>
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              product.stock > 0 
                ? 'bg-slate-border text-white hover:bg-racing-red hover:scale-105 shadow-lg hover:shadow-racing-red/20' 
                : 'bg-slate-border/30 text-gray-600 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-[1px]">Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
