interface ProgressRingProps {
  value: number;
  label: string;
}

export default function ProgressRing({ value, label }: ProgressRingProps) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-24 w-24">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-base-200 dark:text-base-700"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="url(#ringGradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-base-900 dark:text-base-50">{value}%</span>
        <span className="text-xs text-base-500 dark:text-base-400">{label}</span>
      </div>
    </div>
  );
}
