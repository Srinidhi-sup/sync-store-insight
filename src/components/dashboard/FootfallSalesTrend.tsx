import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardData, TimeRange } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

const ranges: { id: TimeRange; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
];

export function FootfallSalesTrend({ trends }: { trends: DashboardData["trends"] }) {
  const [range, setRange] = useState<TimeRange>("7d");
  const data = trends[range];

  return (
    <section className="glass p-5">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold">Footfall &amp; Sales Trend</h2>
          <p className="mt-1 text-xs text-muted-foreground">Visitors vs revenue (₹)</p>
        </div>
        <div className="flex shrink-0 gap-1 rounded-xl border border-border bg-secondary/40 p-1">
          {ranges.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setRange(item.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                range === item.id
                  ? "bg-gradient-brand text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 8, bottom: 0, left: -8 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="var(--primary)"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="var(--teal)"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--popover-foreground)",
                fontSize: "12px",
              }}
              formatter={(value: number, name: string) =>
                name === "Sales (₹)" ? [`₹${value.toLocaleString("en-IN")}`, name] : [value, name]
              }
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="visitors"
              name="Visitors"
              stroke="var(--primary)"
              strokeWidth={2.5}
              dot={{ r: 3, strokeWidth: 0, fill: "var(--primary)" }}
              activeDot={{ r: 5 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sales"
              name="Sales (₹)"
              stroke="var(--teal)"
              strokeWidth={2.5}
              dot={{ r: 3, strokeWidth: 0, fill: "var(--teal)" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
