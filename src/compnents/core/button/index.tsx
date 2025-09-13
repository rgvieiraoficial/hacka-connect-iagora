import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "cancel";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-danger)] text-white hover:opacity-90",
  secondary: "bg-[var(--color-gray)] text-black hover:opacity-90",
  cancel: "bg-[var(--cancel)] text-white hover:opacity-80",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "font-semibold px-4 py-3 rounded-lg border cursor-pointer transition-colors duration-200",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
