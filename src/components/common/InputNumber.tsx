import React from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: number) => void;
  icon?: React.ReactNode;
}

const InputNumber = (props: InputProps) => {
  const { label, placeholder, value, onChange, icon } = props;

  const formatMoney = (value: string) => {
    if (!value) return "";
    const number = value.replace(/\D/g, "");

    return Number(number).toLocaleString("en-US");
  };

  const parseNumber = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const convert = Number(e.target.value.replace(/,/g, ""));
    onChange(convert);
  };


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
          type="text"
          value={formatMoney(value) || ""}
          onChange={(e) => parseNumber(e)}
          className="input-field pl-10! truncate line-clamp-1 w-full"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputNumber;
