import React from "react";
import clsx from "clsx";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

export interface IInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  label?: string;
  className?: string;
  error?: string;
  isRequired?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

export const Input: React.FC<IInputProps> = ({
  label,
  disabled,
  className,
  error,
  isRequired,
  type,
  value,
  onChange,
  ...inputProps
}) => {
  const inputClassNames = clsx(
    "no-spinner bg-[#1E1E1E] border border-gray-600 rounded-full w-full mt-1 py-3 px-6 text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none",
    {
      "bg-gray-900 cursor-not-allowed": disabled,
      "focus:border-blue-100 focus:border-blue-500": !disabled,
      "border-red-500": !!error,
    },
    className
  );

  // Custom onChange handler for number inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (type === "number") {
      // Call onChange with number or empty string for clearing
      if (onChange) onChange(val === "" ? "" : Number(val));
    } else {
      if (onChange) onChange(val);
    }
  };

  // For number inputs, if value is undefined or null, convert to empty string
  const inputValue =
    type === "number" && (value === undefined || value === null) ? "" : value;

  return (
    <div className="w-full">
      {label && (
        <Label label={label} isRequired={isRequired} isError={!!error} />
      )}
      <input
        className={inputClassNames}
        type={type}
        disabled={disabled}
        value={inputValue}
        onChange={handleChange}
        {...inputProps}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
