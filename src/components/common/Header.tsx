import React from 'react';
import { Zap } from 'lucide-react';

export const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-2 relative max-w-2xl mx-auto">
    <h1 className="font-display text-4xl md:text-6xl text-brand-black mb-4 font-extrabold tracking-tight">{title}</h1>
    {subtitle && <p className="text-brand-gray-900/40 font-medium text-sm md:text-base leading-relaxed">{subtitle}</p>}
  </div>
);
