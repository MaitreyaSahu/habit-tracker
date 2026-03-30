import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
      <div className="w-full rounded-[28px] border border-white/50 bg-white/65 px-5 py-4 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-base-900/70">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-base-500 dark:text-sky-300">
          Tracker
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-base-950 dark:text-white">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-base-600 dark:text-base-200">
          {subtitle}
        </p>
      </div>
      {action ? <div className="sm:self-end">{action}</div> : null}
    </div>
  );
}
