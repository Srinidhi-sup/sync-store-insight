import { createFileRoute } from "@tanstack/react-router";

import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { FootfallSalesTrend } from "@/components/dashboard/FootfallSalesTrend";
import { InventoryStatus } from "@/components/dashboard/InventoryStatus";
import { LiveStoreFeed } from "@/components/dashboard/LiveStoreFeed";
import { ProductInterest } from "@/components/dashboard/ProductInterest";
import { QueueMonitoring } from "@/components/dashboard/QueueMonitoring";
import { StatCards } from "@/components/dashboard/StatCards";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RetailSync — Real-Time Retail Analytics Dashboard" },
      {
        name: "description",
        content:
          "Monitor CCTV footfall, POS sales, queues, inventory and AI alerts for your store in real time with RetailSync.",
      },
      { property: "og:title", content: "RetailSync — Real-Time Retail Analytics Dashboard" },
      {
        property: "og:description",
        content: "Live CCTV + POS intelligence: footfall, sales, queues, stock and AI alerts.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data } = useDashboardData();

  return (
    <DashboardShell>
      <PageHeader />
      <StatCards stats={data.stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <LiveStoreFeed feed={data.liveFeed} />
        <AlertsPanel alerts={data.alerts} />
      </div>

      <InventoryStatus inventory={data.inventory} />
      <FootfallSalesTrend trends={data.trends} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <QueueMonitoring queues={data.queues} />
        <ProductInterest products={data.productInterest} />
      </div>
    </DashboardShell>
  );
}
