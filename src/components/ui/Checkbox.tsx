import React from "react";
import clsx from "clsx";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  disabled,
  ...inputProps
}) => {
  return (
    <label
      className={clsx(
        "inline-flex items-center space-x-2 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        type="checkbox"
        disabled={disabled}
        className={clsx(
          "w-4 h-4 rounded-md cursor-pointer",
          disabled && "cursor-not-allowed",
          className
        )}
        {...inputProps}
      />
      {label && (
        <span className="text-sm font-medium text-gray-300">{label}</span>
      )}
    </label>
  );
};
