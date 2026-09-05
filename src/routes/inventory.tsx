import { createFileRoute } from "@tanstack/react-router";

import { InventoryStatus } from "@/components/dashboard/InventoryStatus";
import { ProductInterest } from "@/components/dashboard/ProductInterest";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — RetailSync" },
      {
        name: "description",
        content: "Track in-stock, low-stock and out-of-stock SKUs plus items expiring soon.",
      },
      { property: "og:title", content: "Inventory — RetailSync" },
      {
        property: "og:description",
        content: "Stock health, expiry risk and shelf interest for every SKU in your store.",
      },
    ],
  }),
  component: InventoryPage,
});

function InventoryPage() {
  const { data } = useDashboardData();

  return (
    <DashboardShell>
      <PageHeader title="Inventory" subtitle="Stock health and expiry risk" />
      <InventoryStatus inventory={data.inventory} />
      <ProductInterest products={data.productInterest} />
    </DashboardShell>
  );
}
