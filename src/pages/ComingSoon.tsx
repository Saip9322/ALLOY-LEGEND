import React from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, MessageCircle, Car } from 'lucide-react';
import logoSrc from '../assets/logo1.svg';

export const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen bg-midnight text-gray-100 flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 carbon-pattern opacity-20"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-racing-red/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-racing-red/5 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <img src={logoSrc} alt="Alloy Legends" className="h-16 md:h-24 w-auto" />
        </motion.div>

        {/* Hero Text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[48px] md:text-[84px] font-black uppercase tracking-tight leading-[0.9] text-white mb-6"
        >
          Something <span className="text-racing-red">Legendary</span><br />is coming.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium"
        >
          We're currently fine-tuning our showroom to bring you the finest 1:64 scale diecast models. 
          Stay tuned for the ultimate collector's experience.
        </motion.p>

        {/* Counter Design / Coming Soon Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full mb-16"
        >
          <div className="h-2 w-2 rounded-full bg-racing-red animate-pulse"></div>
          <span className="text-sm font-black uppercase tracking-[3px] text-white">Launching Soon</span>
        </motion.div>

        {/* Social / Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center"
        >
          <p className="text-gray-500 text-sm uppercase tracking-[2px] mb-6">Connect with us</p>
          <div className="flex gap-6">
            <a href="#" className="p-4 bg-white/5 hover:bg-racing-red border border-white/10 hover:border-racing-red rounded-2xl transition-all duration-300 group">
              <Instagram className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="p-4 bg-white/5 hover:bg-racing-red border border-white/10 hover:border-racing-red rounded-2xl transition-all duration-300 group">
              <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:contact@alloylegends.com" className="p-4 bg-white/5 hover:bg-racing-red border border-white/10 hover:border-racing-red rounded-2xl transition-all duration-300 group">
              <Mail className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-24 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[4px] font-black"
        >
          <Car size={16} />
          <span>© 2024 Alloy Legends Precision Models</span>
        </motion.div>
      </div>
    </div>
  );
};
