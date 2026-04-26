import React from 'react';
import { motion } from 'motion/react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const WhatsAppWidget: React.FC = () => {
  const WHATSAPP_LINK = 'https://chat.whatsapp.com/CH3BsklC2qP0b6RfbxG7gW'; // Placeholder - user should update this

  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-[#20ba5a] transition-colors"
      aria-label="Join our WhatsApp Group"
    >
      <WhatsAppIcon className="w-7 h-7" />
      <span className="absolute -top-12 right-0 bg-white text-black text-[10px] font-black py-1 px-3 rounded-full whitespace-nowrap shadow-sm opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest hidden md:block">
        Join the squad
      </span>
    </motion.a>
  );
};
