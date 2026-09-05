import { Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bell,
  FileText,
  LayoutDashboard,
  Package,
  ReceiptText,
  Settings,
  Users,
  Radio,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const navItems = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Live Store", to: "/live-store", icon: Radio },
  { title: "Inventory", to: "/inventory", icon: Package },
  { title: "Billing", to: "/billing", icon: ReceiptText },
  { title: "Customer Analytics", to: "/customer-analytics", icon: Users },
  { title: "Queue Monitoring", to: "/queue-monitoring", icon: Activity },
  { title: "Alerts", to: "/alerts", icon: Bell },
  { title: "Reports", to: "/reports", icon: FileText },
  { title: "Settings", to: "/settings", icon: Settings },
] as const;

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" onClick={onNavigate} className="flex min-w-0 items-center gap-3 px-2 pt-2">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand">
          <BarChart3 className="h-5 w-5 text-primary-foreground" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-lg font-bold leading-none">
            Retail<span className="text-gradient-brand">Sync</span>
          </span>
          <span className="mt-1 block truncate text-[11px] text-muted-foreground">
            CCTV + POS intelligence
          </span>
        </span>
      </Link>

      <nav className="scrollbar-slim flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeOptions={{ exact: item.to === "/" }}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeProps={{
              className: cn(
                "bg-sidebar-accent text-sidebar-accent-foreground glow-primary",
              ),
            }}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="glass rounded-2xl p-4">
        <p className="text-xs font-semibold">Edge AI plan</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          12 cameras · 5 counters synced with POS every 30 seconds.
        </p>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl lg:block">
      <div className="sticky top-0 h-screen">
        <SidebarNav />
      </div>
    </aside>
  );
}
