import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Wallet } from 'lucide-react';

export const ZaloWidget = () => (
  <div className="fixed bottom-32 right-8 z-100 flex flex-col gap-4 print:hidden">
    {/* <motion.button 
      whileHover={{ scale: 1.1 }}
      className="w-14 h-14 bg-brand-orange rounded-full shadow-lg shadow-brand-orange/20 flex items-center justify-center border border-brand-orange/10"
    >
      <Facebook className="w-6 h-6 text-white" />
    </motion.button> */}
    <motion.a 
      href="https://zalo.me/0938582015" 
      target="_blank"
      whileHover={{ scale: 1.1 }}
      className="w-14 h-14 bg-[#0068ff] rounded-full shadow-2xl flex items-center justify-center"
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" className="w-10 h-10" alt="Zalo" />
    </motion.a>
  </div>
);
