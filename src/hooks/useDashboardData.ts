import { useQuery } from "@tanstack/react-query";

import { dashboardData, type DashboardData } from "@/data/dashboardData";

/**
 * Single entry point for every dashboard section.
 * Swap the queryFn for a real `fetch("/api/dashboard")` later — the returned
 * shape (DashboardData) is all the UI depends on.
 */
async function fetchDashboardData(): Promise<DashboardData> {
  return dashboardData;
}

export function useDashboardData() {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    initialData: dashboardData,
    refetchInterval: 30_000,
  });

  return { data: query.data, isLoading: query.isLoading, refetch: query.refetch };
}
