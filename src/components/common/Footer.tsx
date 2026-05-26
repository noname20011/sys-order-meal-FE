import React from "react";
import { Heart, Utensils, Leaf } from "lucide-react";

export const Footer = () => (
  <footer className="py-12 border-t border-brand-gray-100 text-center print:hidden font-sans">
    <div className="flex items-center justify-center gap-6 mb-6">
      <Heart className="w-5 h-5 text-brand-orange" />
      <Utensils className="w-5 h-5 text-brand-orange/40" />
    </div>
    <p className="text-xl font-display font-bold text-brand-black mb-2 italic">
      Clean Eating • Healthy Living
    </p>
    <p className="text-brand-gray-900/40 text-sm font-medium">
      © 2024 Healthy Box Team. Passionate about nutrition.
    </p>
  </footer>
);
