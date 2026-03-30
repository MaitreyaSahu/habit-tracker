import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export default function Card({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/50 bg-white/70 p-5 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-base-900/70",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
