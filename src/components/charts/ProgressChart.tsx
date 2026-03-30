import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ProgressChartProps {
  data: Array<{ label: string; completed: number }>;
}

export default function ProgressChart({ data }: ProgressChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="label" axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={28} />
          <Tooltip cursor={{ fill: "rgba(148,163,184,0.08)" }} />
          <Bar dataKey="completed" fill="#3b82f6" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
