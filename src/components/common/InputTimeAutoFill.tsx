import { Calendar } from 'lucide-react';
import React from 'react'

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  weeksCount: number;
  onChange: (value: string) => void;
}

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const InputTimeAutoFill = (props: InputProps) => {
    const { label, value, weeksCount, onChange } = props;
  return (
    <div className="space-y-3">
             <label className="text-sm font-bold text-brand-gray-900/60 ml-1">{label}</label>
             <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange/40" />
                <div className="input-field pl-10! flex items-center bg-brand-gray-50/50 border border-brand-gray-100 text-brand-black/80 font-thin select-none cursor-not-allowed">
                  {(() => {
                     if (!value) return '...';
                     const startD = new Date(value);
                     if (isNaN(startD.getTime())) return 'Ngày không hợp lệ';
                     const endD = new Date(startD);
                     endD.setDate(endD.getDate() + (weeksCount * 7 - 1));
                     const day = String(endD.getDate()).padStart(2, '0');
                     const month = String(endD.getMonth() + 1).padStart(2, '0');
                     const year = endD.getFullYear();
                     return `${day}/${month}/${year}`;
                  })()}
                </div>
             </div>
          </div>
  )
}

export default InputTimeAutoFill