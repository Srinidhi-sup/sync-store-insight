import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

import type { StatCard } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

const accentStroke: Record<StatCard["accent"], string> = {
  primary: "var(--primary)",
  teal: "var(--teal)",
  warning: "var(--warning)",
  critical: "var(--critical)",
  success: "var(--success)",
};

const accentText: Record<StatCard["accent"], string> = {
  primary: "text-primary",
  teal: "text-teal",
  warning: "text-warning",
  critical: "text-critical",
  success: "text-success",
};

export function StatCards({ stats }: { stats: StatCard[] }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {stats.map((stat) => {
        const up = stat.changePct >= 0;
        return (
          <article key={stat.id} className="glass p-4 transition-transform hover:-translate-y-0.5">
            <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </p>
            <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
              <div className="min-w-0">
                <p className={cn("truncate text-2xl font-bold", accentText[stat.accent])}>
                  {stat.value}
                </p>
                <p className="mt-1.5 flex min-w-0 items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold",
                      up ? "bg-success/15 text-success" : "bg-critical/15 text-critical",
                    )}
                  >
                    {up ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {up ? "+" : ""}
                    {stat.changePct}%
                  </span>
                  <span className="truncate">{stat.hint}</span>
                </p>
              </div>
              <div className="h-12 w-20 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stat.sparkline}>
                    <defs>
                      <linearGradient id={`spark-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={accentStroke[stat.accent]}
                          stopOpacity={0.55}
                        />
                        <stop
                          offset="100%"
                          stopColor={accentStroke[stat.accent]}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={accentStroke[stat.accent]}
                      strokeWidth={2}
                      fill={`url(#spark-${stat.id})`}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
