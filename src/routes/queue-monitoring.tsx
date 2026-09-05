import { createFileRoute } from "@tanstack/react-router";

import { QueueMonitoring } from "@/components/dashboard/QueueMonitoring";
import { StatCards } from "@/components/dashboard/StatCards";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

export const Route = createFileRoute("/queue-monitoring")({
  head: () => ({
    meta: [
      { title: "Queue Monitoring — RetailSync" },
      {
        name: "description",
        content: "Live checkout queue lengths and average wait times for every counter.",
      },
      { property: "og:title", content: "Queue Monitoring — RetailSync" },
      {
        property: "og:description",
        content: "Counter-by-counter queue length and wait time monitoring in real time.",
      },
    ],
  }),
  component: QueuePage,
});

function QueuePage() {
  const { data } = useDashboardData();

  return (
    <DashboardShell>
      <PageHeader title="Queue Monitoring" subtitle="Counter load and wait times" />
      <StatCards stats={data.stats.filter((s) => ["queue", "visitors"].includes(s.id))} />
      <QueueMonitoring queues={data.queues} />
    </DashboardShell>
  );
}
