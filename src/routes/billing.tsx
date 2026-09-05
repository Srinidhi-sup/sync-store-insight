import { createFileRoute } from "@tanstack/react-router";

import { FootfallSalesTrend } from "@/components/dashboard/FootfallSalesTrend";
import { StatCards } from "@/components/dashboard/StatCards";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

export const Route = createFileRoute("/billing")({
  head: () => ({
    meta: [
      { title: "Billing — RetailSync" },
      {
        name: "description",
        content: "Review POS billing volume, revenue trend and counter throughput for your store.",
      },
      { property: "og:title", content: "Billing — RetailSync" },
      {
        property: "og:description",
        content: "POS billing volume and revenue performance across counters.",
      },
    ],
  }),
  component: BillingPage,
});

function BillingPage() {
  const { data } = useDashboardData();

  return (
    <DashboardShell>
      <PageHeader title="Billing" subtitle="POS revenue and counter throughput" />
      <StatCards stats={data.stats.filter((s) => ["sales", "conversion", "queue"].includes(s.id))} />
      <FootfallSalesTrend trends={data.trends} />
    </DashboardShell>
  );
}
