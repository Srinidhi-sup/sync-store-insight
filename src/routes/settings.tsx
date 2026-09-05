import { createFileRoute } from "@tanstack/react-router";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDashboardData } from "@/hooks/useDashboardData";

const toggles = [
  { id: "t1", label: "Critical alert push notifications", hint: "Instant alerts on theft detection" },
  { id: "t2", label: "Queue overflow alerts", hint: "Notify when wait time exceeds 5 minutes" },
  { id: "t3", label: "Daily email summary", hint: "Sent every night at 11 PM IST" },
  { id: "t4", label: "Expiry reminders", hint: "Flag items 7 days before expiry" },
];

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — RetailSync" },
      {
        name: "description",
        content: "Manage store profile, camera sync and alert preferences in RetailSync.",
      },
      { property: "og:title", content: "Settings — RetailSync" },
      {
        property: "og:description",
        content: "Store profile, camera sync status and alert preference controls.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { data } = useDashboardData();

  return (
    <DashboardShell>
      <PageHeader title="Settings" subtitle="Store profile and alert preferences" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="glass p-5">
          <h2 className="text-base font-semibold">Store profile</h2>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Owner", data.owner.name],
              ["Store", data.owner.store],
              ["Cameras online", `${data.systemStatus.camerasOnline} of ${data.systemStatus.camerasTotal}`],
              ["POS sync interval", "30 seconds"],
            ].map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <dt className="truncate text-muted-foreground">{key}</dt>
                <dd className="truncate font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="glass p-5">
          <h2 className="text-base font-semibold">Notifications</h2>
          <div className="mt-4 space-y-4">
            {toggles.map((toggle, index) => (
              <div key={toggle.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="min-w-0">
                  <Label htmlFor={toggle.id} className="truncate text-sm font-medium">
                    {toggle.label}
                  </Label>
                  <p className="mt-1 truncate text-[11px] text-muted-foreground">{toggle.hint}</p>
                </div>
                <Switch id={toggle.id} defaultChecked={index !== 2} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
