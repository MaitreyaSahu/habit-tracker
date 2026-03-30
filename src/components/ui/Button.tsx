import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-base-900 text-white shadow-lg shadow-base-900/20 hover:bg-base-800 dark:bg-white dark:text-base-900 dark:hover:bg-base-100",
    secondary:
      "bg-white/80 text-base-900 ring-1 ring-base-200/80 hover:bg-white dark:bg-base-800/80 dark:text-white dark:ring-base-700",
    ghost:
      "bg-transparent text-base-600 hover:bg-base-100 dark:text-base-300 dark:hover:bg-base-800",
    danger: "bg-rose-500 text-white hover:bg-rose-600"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
