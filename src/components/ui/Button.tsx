import React from "react";
import clsx from "clsx";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "filled" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-4 text-base",
  lg: "px-6 py-5 text-lg",
};

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-300 active:bg-blue-700",
  outline:
    "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-300 active:bg-blue-700 active:text-white",
};

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  variant = "filled",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "rounded-lg cursor-pointer font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-1",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
