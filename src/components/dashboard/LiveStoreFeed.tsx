import { Camera, Maximize2, Users } from "lucide-react";
import { useEffect, useState } from "react";

import liveFeedImage from "@/assets/live-feed.jpg";
import type { DashboardData } from "@/data/dashboardData";

export function LiveStoreFeed({ feed }: { feed: DashboardData["liveFeed"] }) {
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="glass overflow-hidden p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Camera className="h-4 w-4 shrink-0 text-teal" />
          <h2 className="truncate text-base font-semibold">Live Store Feed</h2>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Expand feed"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl border border-border bg-secondary/50">
        <img
          src={liveFeedImage}
          alt="Live surveillance view of the main store aisle"
          width={1280}
          height={720}
          className="h-full w-full object-cover opacity-85"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-background/40" />

        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-critical/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive-foreground" />
          Live
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[11px] backdrop-blur">
          {clock}
        </span>

        <div className="absolute inset-x-3 bottom-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">{feed.camera}</span>
            <span className="block truncate text-[11px] text-muted-foreground">{feed.zone}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
            <Users className="h-3 w-3 text-teal" />
            {feed.peopleInFrame} in frame
          </span>
        </div>
      </div>
    </section>
  );
}
