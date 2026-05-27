import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

interface ButtonProps {
  onClick: () => void;
  isHasBackButton?: boolean;
  text: string;
  className: string | boolean;
  disableMainBtn?: boolean;
  disableBackBtn?: boolean;
  handleBack?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const {
    onClick,
    isHasBackButton = true,
    text,
    className,
    handleBack,
    disableBackBtn = false,
    disableMainBtn = false,
    children,
    icon
  } = props;

  return (
    <div className="fixed bottom-0 left-0 right-0 pt-2 pb-6 px-3 bg-white/80 backdrop-blur-xl border-t border-brand-gray-100 z-50">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        {isHasBackButton && (
          <button
            onClick={handleBack}
            className="flex-1 py-5 rounded-full border-2 border-brand-black/30 text-brand-gray-900/60 font-bold flex items-center justify-center gap-2 hover:bg-brand-gray-50 transition-all uppercase tracking-widest text-xs cursor-pointer"
            disabled={disableBackBtn}
          >
            <ArrowLeft className="w-5 h-5" /> Trở về
          </button>
        )}
        <button
          onClick={onClick}
          className={`flex-2 py-3 rounded-full ${className ? className : "bg-brand-orange text-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"} font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20 text-lg`}
          disabled={disableMainBtn}
        >
          {text}
          {icon ? icon : <ArrowRight className="w-6 h-6" />}
        </button>
      </div>
      {children}
    </div>
  );
};

export default Button;
