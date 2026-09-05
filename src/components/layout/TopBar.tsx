import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";

import { SidebarNav } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useDashboardData } from "@/hooks/useDashboardData";

export function TopBar() {
  const { data } = useDashboardData();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarNav onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products, cameras, bills…"
            className="h-10 w-full rounded-xl border-border bg-secondary/50 pl-9 text-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary/50 md:max-w-md"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-critical px-1 text-[10px] font-bold text-destructive-foreground">
              {data.notifications}
            </span>
          </Button>

          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-secondary/40 px-2 py-1.5 sm:px-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-brand text-xs font-bold text-primary-foreground">
              {data.owner.initials}
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-semibold leading-tight">
                {data.owner.name}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">Store Owner</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
