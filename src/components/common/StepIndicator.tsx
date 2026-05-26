import { motion } from 'motion/react';

interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = [
  { id: 1, label: 'Chọn gói' },
  { id: 2, label: 'Chọn món' },
  { id: 3, label: 'Thông tin' },
  { id: 4, label: 'Thanh toán' },
  { id: 5, label: 'Cảm ơn' },
];

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  // Don't show stepper on the success page (Step 5)
  if (currentStep === 5) return null;

  return (
    <div className="max-w-xl mx-auto mb-12 px-4 print:hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-brand-orange font-bold text-sm tracking-widest uppercase">
          Bước {currentStep} trên 5
        </span>
        <span className="text-brand-gray-900/70 font-bold text-xs uppercase tracking-wider">
          {STEPS.find(s => s.id === currentStep)?.label}
        </span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="h-2 w-full bg-brand-gray-50 rounded-full overflow-hidden border border-brand-gray-100 flex">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / 5) * 100}%` }}
          className="h-full bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.3)] transition-all duration-500"
        />
      </div>
    </div>
  );
};
