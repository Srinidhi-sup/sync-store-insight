import { Camera, ShieldAlert } from "lucide-react";

import type { Alert } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

const severityStyles: Record<Alert["severity"], string> = {
  Critical: "bg-critical/15 text-critical border-critical/30",
  High: "bg-warning/15 text-warning border-warning/30",
  Medium: "bg-teal/15 text-teal border-teal/30",
};

export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <section className="glass flex flex-col p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <ShieldAlert className="h-4 w-4 shrink-0 text-primary" />
          <h2 className="truncate text-base font-semibold">AI Alerts</h2>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          {alerts.length} today
        </span>
      </div>

      <ul className="scrollbar-slim mt-4 max-h-[26rem] space-y-3 overflow-y-auto pr-1">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="rounded-xl border border-border bg-secondary/30 p-3.5 transition-colors hover:bg-secondary/50"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <p className="min-w-0 truncate text-sm font-semibold">{alert.title}</p>
              <span
                className={cn(
                  "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  severityStyles[alert.severity],
                )}
              >
                {alert.severity}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {alert.description}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
              <span className="flex min-w-0 items-center gap-1">
                <Camera className="h-3 w-3 shrink-0" />
                <span className="truncate">{alert.camera}</span>
              </span>
              <span className="text-border">•</span>
              <span>{alert.timestamp}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
