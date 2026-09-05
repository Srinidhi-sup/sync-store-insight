import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";

import { FootfallSalesTrend } from "@/components/dashboard/FootfallSalesTrend";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

const reports = [
  { id: "r1", name: "Daily sales & footfall summary", period: "Today", size: "182 KB" },
  { id: "r2", name: "Weekly conversion breakdown", period: "Last 7 days", size: "410 KB" },
  { id: "r3", name: "Shrinkage & alert audit", period: "Last 30 days", size: "1.1 MB" },
  { id: "r4", name: "Expiry and wastage report", period: "Last 30 days", size: "764 KB" },
];

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — RetailSync" },
      {
        name: "description",
        content: "Download sales, footfall, shrinkage and wastage reports for your store.",
      },
      { property: "og:title", content: "Reports — RetailSync" },
      {
        property: "og:description",
        content: "Exportable retail performance reports across sales, footfall and shrinkage.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const { data } = useDashboardData();

  return (
    <DashboardShell>
      <PageHeader title="Reports" subtitle="Exports and scheduled summaries" />
      <FootfallSalesTrend trends={data.trends} />
      <section className="glass p-5">
        <h2 className="text-base font-semibold">Available reports</h2>
        <ul className="mt-4 space-y-3">
          {reports.map((report) => (
            <li
              key={report.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-secondary/30 p-3.5"
            >
              <span className="flex min-w-0 items-center gap-3">
                <FileText className="h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{report.name}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {report.period} · {report.size}
                  </span>
                </span>
              </span>
              <button
                type="button"
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-accent"
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
            </li>
          ))}
        </ul>
      </section>
    </DashboardShell>
  );
}
