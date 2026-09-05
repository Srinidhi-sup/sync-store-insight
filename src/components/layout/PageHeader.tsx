import { useEffect, useState } from "react";

import { useDashboardData } from "@/hooks/useDashboardData";

function greetingFor(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function PageHeader({ title, subtitle }: { title?: string; subtitle?: string }) {
  const { data } = useDashboardData();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const heading = title ?? `${now ? greetingFor(now.getHours()) : "Welcome back"}, ${data.owner.name.split(" ")[0]}`;

  return (
    <section className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold sm:text-3xl">{heading}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {subtitle ?? data.owner.store}
          <span className="mx-2 text-border">|</span>
          {now
            ? now.toLocaleString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "Syncing clock…"}
        </p>
      </div>

      <div className="glass flex items-center gap-3 justify-self-start px-4 py-2.5 lg:justify-self-end">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs font-semibold">{data.systemStatus.label}</span>
          <span className="block truncate text-[11px] text-muted-foreground">
            {data.systemStatus.camerasOnline}/{data.systemStatus.camerasTotal} cameras · POS linked
          </span>
        </span>
      </div>
    </section>
  );
}
