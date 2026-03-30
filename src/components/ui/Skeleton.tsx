import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-3xl bg-gradient-to-r from-base-200 via-base-100 to-base-200 dark:from-base-800 dark:via-base-700 dark:to-base-800",
        className
      )}
    />
  );
}
