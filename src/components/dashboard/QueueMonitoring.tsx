import { Clock, Users } from "lucide-react";

import type { QueueCounter } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

const barColor: Record<QueueCounter["status"], string> = {
  calm: "bg-teal",
  busy: "bg-warning",
  overloaded: "bg-critical",
};

const statusLabel: Record<QueueCounter["status"], string> = {
  calm: "Calm",
  busy: "Busy",
  overloaded: "Overloaded",
};

export function QueueMonitoring({ queues }: { queues: QueueCounter[] }) {
  return (
    <section className="glass p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="truncate text-base font-semibold">Queue Monitoring</h2>
        <span className="shrink-0 text-[11px] text-muted-foreground">
          {queues.reduce((sum, q) => sum + q.customers, 0)} customers waiting
        </span>
      </div>

      <ul className="mt-4 space-y-4">
        {queues.map((queue) => (
          <li key={queue.id}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <span className="min-w-0 truncate text-sm font-medium">{queue.name}</span>
              <span className="flex shrink-0 items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {queue.customers}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {queue.avgWaitMins}m
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-semibold",
                    queue.status === "overloaded" && "bg-critical/15 text-critical",
                    queue.status === "busy" && "bg-warning/15 text-warning",
                    queue.status === "calm" && "bg-teal/15 text-teal",
                  )}
                >
                  {statusLabel[queue.status]}
                </span>
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-secondary/70">
              <div
                className={cn("h-full rounded-full transition-all", barColor[queue.status])}
                style={{
                  width: `${Math.min(100, Math.round((queue.customers / queue.capacity) * 100))}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
