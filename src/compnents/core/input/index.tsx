import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary" | "cancel"; // opcional, se quiser variações no futuro
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const variantClasses: Record<string, string> = {
    primary: "border border-[var(--color-gray)] bg-white text-[var(--color-primary)] focus:border-[var(--color-danger)] focus:ring-1 focus:ring-[var(--color-danger)]",
    secondary: "border border-[var(--color-gray-light)] bg-[var(--color-surface)] text-[var(--color-primary)] focus:border-[var(--color-danger)] focus:ring-1 focus:ring-[var(--color-danger)]",
    cancel: "border border-[var(--cancel)] bg-white text-[var(--cancel)] focus:border-[var(--cancel)] focus:ring-1 focus:ring-[var(--cancel)]",
  };

  return (
    <input
      className={twMerge(
        "px-4 py-4 rounded-md text-sm placeholder-gray-400 focus:outline-none transition-colors duration-200",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};
