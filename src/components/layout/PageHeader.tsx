import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-base-500 dark:text-white/80">
          Tracker
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-base-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-base-500 dark:text-white/75">
          {subtitle}
        </p>
      </div>
      {action}
    </div>
  );
}
