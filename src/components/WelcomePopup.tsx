import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const WHATSAPP_LINK = 'https://chat.whatsapp.com/CH3BsklC2qP0b6RfbxG7gW';

  useEffect(() => {
    // Don't show popup on balance checkout page
    if (location.pathname.startsWith('/checkout/balance')) {
      return;
    }

    const hasSeenPopup = sessionStorage.getItem('welcome-popup-seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('welcome-popup-seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Left side: Image */}
            <div className="w-full md:w-1/2 h-48 md:h-auto bg-gray-100 flex items-center justify-center overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop" 
                alt="Supercars under cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side: Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-black">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <span className="text-[12px] font-medium text-gray-500 uppercase tracking-widest mb-4 block">
                Stay ahead of the drop.
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6">
                Get early access to new arrivals, curated deals, and limited releases.
              </h2>
              
              <p className="text-gray-600 mb-8 font-medium">
                Join our WhatsApp channel.
              </p>

              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="inline-flex items-center justify-between border-2 border-black rounded-full px-8 py-4 text-[14px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all group max-w-xs"
              >
                Join Now
                <ArrowRight size={18} className="ml-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
