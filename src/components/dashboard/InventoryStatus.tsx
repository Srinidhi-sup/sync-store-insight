import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { DashboardData } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

const sliceColors: Record<string, string> = {
  in: "var(--teal)",
  low: "var(--warning)",
  out: "var(--critical)",
};

function daysBadge(days: number) {
  if (days <= 2) return "bg-critical/15 text-critical border-critical/30";
  if (days <= 4) return "bg-warning/15 text-warning border-warning/30";
  return "bg-teal/15 text-teal border-teal/30";
}

export function InventoryStatus({ inventory }: { inventory: DashboardData["inventory"] }) {
  return (
    <section className="glass p-5">
      <h2 className="text-base font-semibold">Inventory Status</h2>
      <p className="mt-1 text-xs text-muted-foreground">{inventory.total} SKUs tracked live</p>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        <div>
          <div className="relative h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventory.slices}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="66%"
                  outerRadius="92%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {inventory.slices.map((slice) => (
                    <Cell key={slice.key} fill={sliceColors[slice.key]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--popover-foreground)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {Math.round(((inventory.slices[0]?.value ?? 0) / inventory.total) * 100)}%
                </p>
                <p className="text-[11px] text-muted-foreground">healthy stock</p>
              </div>
            </div>
          </div>
          <ul className="mt-3 space-y-2">
            {inventory.slices.map((slice) => (
              <li key={slice.key} className="flex items-center justify-between gap-3 text-xs">
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: sliceColors[slice.key] }}
                  />
                  <span className="truncate text-muted-foreground">{slice.name}</span>
                </span>
                <span className="shrink-0 font-semibold">{slice.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold">Expiring Soon</h3>
          <ul className="scrollbar-slim mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
            {inventory.expiring.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-secondary/30 px-3 py-2.5"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{item.name}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {item.sku} · {item.qty} units
                  </span>
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold",
                    daysBadge(item.daysLeft),
                  )}
                >
                  {item.daysLeft}d left
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
