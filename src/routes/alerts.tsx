import { createFileRoute } from "@tanstack/react-router";

import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { LiveStoreFeed } from "@/components/dashboard/LiveStoreFeed";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — RetailSync" },
      {
        name: "description",
        content: "AI alerts for theft, queue overflow, shelf gaps and billing mismatches.",
      },
      { property: "og:title", content: "Alerts — RetailSync" },
      {
        property: "og:description",
        content: "Severity-ranked AI alerts with camera source and timestamps.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const { data } = useDashboardData();

  return (
    <DashboardShell>
      <PageHeader title="Alerts" subtitle="AI detections across all cameras" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <LiveStoreFeed feed={data.liveFeed} />
        <AlertsPanel alerts={data.alerts} />
      </div>
    </DashboardShell>
  );
}
