import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../ui/Card";
import type { WeeklyCount } from "../../lib/analytics";

interface ApplicationsPerWeekChartProps {
  data: WeeklyCount[];
}

export function ApplicationsPerWeekChart({ data }: ApplicationsPerWeekChartProps) {
  const hasAnyApplications = data.some((week) => week.count > 0);

  return (
    <Card padding="lg">
      <h3 className="font-body text-sm font-medium text-muted">
        Applications per week
      </h3>
      <p className="mt-1 font-body text-sm text-muted">last 8 weeks</p>

      {!hasAnyApplications ? (
        <p className="mt-6 font-body text-sm text-muted">
          No applications in this window yet.
        </p>
      ) : (
        <div className="mt-4 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#64748B" strokeOpacity={0.15} />
              <XAxis
                dataKey="weekLabel"
                tick={{ fontFamily: "Roboto Mono, monospace", fontSize: 11, fill: "#64748B" }}
                axisLine={{ stroke: "#64748B", strokeOpacity: 0.2 }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontFamily: "Roboto Mono, monospace", fontSize: 11, fill: "#64748B" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                cursor={{ fill: "#2563EB", fillOpacity: 0.08 }}
                contentStyle={{
                  fontFamily: "Work Sans, sans-serif",
                  fontSize: "0.8rem",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}