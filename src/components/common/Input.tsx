import React from "react";
interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const Input = (props: InputProps) => {
  const { label, placeholder, value, onChange, icon } = props;
  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-brand-gray-900/60 ml-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </div>
        )}
        <input
          type=""
          value={value}
          onChange={(e) => onChange(e)}
          className="input-field pl-10! truncate line-clamp-1 w-full"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
