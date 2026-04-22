import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Mail, MessageCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { appName } = useAppContext();
  const location = useLocation();

  // Hide Footer for Admin Dashboard
  if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return null;
  }

  return (
    <footer className="bg-midnight text-gray-500 border-t border-slate-border pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-black text-[24px] tracking-[2px] uppercase mb-6">
              <Car className="h-7 w-7 text-racing-red" />
              <span className="text-white">{appName.split(' ')[0]} <span className="text-racing-red">{appName.split(' ')[1] || ''}</span></span>
            </Link>
            <p className="text-[13px] mb-8 leading-relaxed text-gray-500">
              Premium diecast models for true automotive enthusiasts. Curated selection of 1:64 scale masterpieces for the ultimate collector.
            </p>
            <div className="flex space-x-6">
              <a href="https://wa.me/917008916117" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-racing-red transition-all hover:scale-110" title="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-black mb-6 uppercase tracking-[3px] text-[10px]">Shop</h3>
            <ul className="space-y-3 text-[12px] font-bold uppercase tracking-[1px]">
              <li><Link to="/products" className="hover:text-racing-red transition-colors">All Models</Link></li>
              <li><Link to="/products?brand=MiniGT" className="hover:text-racing-red transition-colors">MiniGT</Link></li>
              <li><Link to="/products?brand=Hotwheels Mainline" className="hover:text-racing-red transition-colors">Hotwheels Mainline</Link></li>
              <li><Link to="/products?brand=Hot wheels RLC" className="hover:text-racing-red transition-colors">Hotwheels RLC</Link></li>
              <li><Link to="/products?brand=Elite64" className="hover:text-racing-red transition-colors">Elite64</Link></li>
              <li><Link to="/products?brand=CM models" className="hover:text-racing-red transition-colors">CM Models</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 uppercase tracking-[3px] text-[10px]">Support</h3>
            <ul className="space-y-3 text-[12px] font-bold uppercase tracking-[1px]">
              <li><a href="#" className="hover:text-racing-red transition-colors">FAQ</a></li>
              <li><Link to="/orders" className="hover:text-racing-red transition-colors">Track Order</Link></li>
              <li><a href="https://wa.me/917008916117" target="_blank" rel="noopener noreferrer" className="hover:text-racing-red transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black mb-6 uppercase tracking-[3px] text-[10px]">Newsletter</h3>
            <p className="text-[13px] mb-6 text-gray-500">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-dark border border-slate-border text-white px-5 py-3 w-full focus:outline-none focus:border-racing-red rounded-l-full text-[12px] transition-colors"
              />
              <button 
                type="submit" 
                className="racing-gradient text-white px-6 py-3 rounded-r-full transition-all hover:scale-105 flex items-center justify-center"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-border/30 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[2px] text-gray-600">
          <p>&copy; {new Date().getFullYear()} {appName}. Precision Engineered.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
