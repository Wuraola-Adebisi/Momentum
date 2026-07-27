import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "../ui/Card";
import type { StatusBreakdownItem } from "../../lib/analytics";

const STATUS_COLORS: Record<string, string> = {
  applied: "#2563EB",
  interviewing: "#6C4FD9",
  offer: "#1E9E6B",
  rejected: "#DC5B5B",
};

interface ResponseRateChartProps {
  responseRate: number;
  breakdown: StatusBreakdownItem[];
}

export function ResponseRateChart({
  responseRate,
  breakdown,
}: ResponseRateChartProps) {
  const total = breakdown.reduce((sum, item) => sum + item.count, 0);
  const chartData = breakdown.filter((item) => item.count > 0);

  return (
    <Card padding="lg">
      <h3 className="font-body text-sm font-medium text-muted">
        Response rate
      </h3>
      <p className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
        {responseRate}%
      </p>
      <p className="mt-1 font-body text-sm text-muted">
        of applications have moved past &quot;applied&quot;
      </p>

      {total === 0 ? (
        <p className="mt-6 font-body text-sm text-muted">
          No applications yet, add one to see this fill in.
        </p>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="h-40 w-40 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="label"
                  innerRadius="65%"
                  outerRadius="100%"
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {chartData.map((item) => (
                    <Cell key={item.status} fill={STATUS_COLORS[item.status]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontFamily: "Work Sans, sans-serif",
                    fontSize: "0.8rem",
                    borderRadius: "0.5rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="flex w-full flex-col gap-2 sm:w-auto">
            {breakdown.map((item) => (
              <li
                key={item.status}
                className="flex items-center justify-between gap-4 font-body text-sm"
              >
                <span className="flex items-center gap-2 text-ink">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[item.status] }}
                  />
                  {item.label}
                </span>
                <span className="font-data text-muted">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
