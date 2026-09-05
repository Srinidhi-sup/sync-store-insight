import { createFileRoute } from "@tanstack/react-router";

import { LiveStoreFeed } from "@/components/dashboard/LiveStoreFeed";
import { QueueMonitoring } from "@/components/dashboard/QueueMonitoring";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

export const Route = createFileRoute("/live-store")({
  head: () => ({
    meta: [
      { title: "Live Store — RetailSync" },
      {
        name: "description",
        content: "Watch live camera feeds, people-in-frame counts and checkout activity as it happens.",
      },
      { property: "og:title", content: "Live Store — RetailSync" },
      {
        property: "og:description",
        content: "Live camera feeds and real-time in-store activity for your retail floor.",
      },
    ],
  }),
  component: LiveStorePage,
});

function LiveStorePage() {
  const { data } = useDashboardData();

  return (
    <DashboardShell>
      <PageHeader title="Live Store" subtitle="Cameras streaming from the shop floor" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <LiveStoreFeed feed={data.liveFeed} />
        <QueueMonitoring queues={data.queues} />
      </div>
    </DashboardShell>
  );
}
