import React from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const InputTime = (props: InputProps) => {
const { label, value, onChange, icon } = props;

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
          type="date"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="input-field pl-10! pr-4 text-brand-black cursor-pointer"
          min={new Date().toISOString().split("T")[0]}
          id="checkout_start_date"
        />
      </div>
    </div>
  );
};

export default InputTime;
