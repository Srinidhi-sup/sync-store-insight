/**
 * Single source of mock data for RetailSync.
 * Shape mirrors a future API response so `useDashboardData` can be swapped
 * for a real fetch without touching any component.
 */

export type TimeRange = "today" | "7d" | "30d";

export type StatCard = {
  id: string;
  label: string;
  value: string;
  changePct: number;
  hint: string;
  accent: "primary" | "teal" | "warning" | "critical" | "success";
  sparkline: { i: number; v: number }[];
};

export type Alert = {
  id: string;
  severity: "Critical" | "High" | "Medium";
  title: string;
  description: string;
  camera: string;
  timestamp: string;
};

export type InventorySlice = { name: string; value: number; key: string };
export type ExpiringItem = { id: string; name: string; sku: string; daysLeft: number; qty: number };
export type TrendPoint = { label: string; visitors: number; sales: number };
export type QueueCounter = {
  id: string;
  name: string;
  customers: number;
  capacity: number;
  avgWaitMins: number;
  status: "calm" | "busy" | "overloaded";
};
export type ProductInterest = {
  id: string;
  name: string;
  category: string;
  views: number;
  purchases: number;
};

export type DashboardData = {
  owner: { name: string; store: string; initials: string };
  systemStatus: { label: string; online: boolean; camerasOnline: number; camerasTotal: number };
  notifications: number;
  stats: StatCard[];
  liveFeed: { camera: string; zone: string; peopleInFrame: number };
  alerts: Alert[];
  inventory: { total: number; slices: InventorySlice[]; expiring: ExpiringItem[] };
  trends: Record<TimeRange, TrendPoint[]>;
  queues: QueueCounter[];
  productInterest: ProductInterest[];
};

const spark = (seed: number[]) => seed.map((v, i) => ({ i, v }));

export const dashboardData: DashboardData = {
  owner: { name: "Ravi Menon", store: "RetailSync · Jayanagar Mart", initials: "RM" },
  systemStatus: { label: "All systems operational", online: true, camerasOnline: 11, camerasTotal: 12 },
  notifications: 7,
  stats: [
    {
      id: "visitors",
      label: "Total Visitors Today",
      value: "2,418",
      changePct: 12.4,
      hint: "vs yesterday",
      accent: "primary",
      sparkline: spark([18, 24, 21, 32, 28, 41, 38, 52, 48, 61]),
    },
    {
      id: "sales",
      label: "Sales Today",
      value: "₹4,86,320",
      changePct: 8.1,
      hint: "vs yesterday",
      accent: "teal",
      sparkline: spark([30, 34, 31, 44, 40, 47, 52, 50, 63, 71]),
    },
    {
      id: "conversion",
      label: "Conversion Rate",
      value: "31.6%",
      changePct: -2.3,
      hint: "vs 7-day avg",
      accent: "success",
      sparkline: spark([44, 42, 46, 41, 39, 43, 38, 40, 36, 35]),
    },
    {
      id: "queue",
      label: "Active Queue Count",
      value: "18",
      changePct: 21.7,
      hint: "across 5 counters",
      accent: "warning",
      sparkline: spark([6, 9, 8, 12, 15, 13, 17, 16, 19, 18]),
    },
    {
      id: "stock",
      label: "Low / Expiring Stock",
      value: "34",
      changePct: 5.6,
      hint: "SKUs need action",
      accent: "warning",
      sparkline: spark([22, 25, 24, 27, 29, 28, 31, 30, 33, 34]),
    },
    {
      id: "alerts",
      label: "Alerts Today",
      value: "12",
      changePct: -14.2,
      hint: "3 unresolved",
      accent: "critical",
      sparkline: spark([20, 18, 22, 17, 15, 16, 14, 13, 12, 12]),
    },
  ],
  liveFeed: { camera: "CAM-03 · Main Aisle", zone: "Grocery / Ambient", peopleInFrame: 14 },
  alerts: [
    {
      id: "a1",
      severity: "Critical",
      title: "Shoplifting behaviour detected",
      description: "Item concealed in bag near premium liquor shelf, no billing event matched.",
      camera: "CAM-07 · Aisle 4",
      timestamp: "2 min ago",
    },
    {
      id: "a2",
      severity: "High",
      title: "Queue overflow at Counter 3",
      description: "9 customers waiting, average wait crossed 7 minutes threshold.",
      camera: "CAM-01 · Checkout",
      timestamp: "6 min ago",
    },
    {
      id: "a3",
      severity: "High",
      title: "Unattended entry gate",
      description: "Staff absent at returns desk for 11 minutes during peak footfall.",
      camera: "CAM-09 · Returns",
      timestamp: "18 min ago",
    },
    {
      id: "a4",
      severity: "Medium",
      title: "Shelf gap detected",
      description: "Dairy shelf row B shows 40% empty facings — restock suggested.",
      camera: "CAM-05 · Dairy",
      timestamp: "34 min ago",
    },
    {
      id: "a5",
      severity: "Medium",
      title: "Billing mismatch flagged",
      description: "POS scan count lower than items detected at bagging area.",
      camera: "CAM-02 · Counter 1",
      timestamp: "51 min ago",
    },
  ],
  inventory: {
    total: 1840,
    slices: [
      { key: "in", name: "In Stock", value: 1462 },
      { key: "low", name: "Low Stock", value: 288 },
      { key: "out", name: "Out of Stock", value: 90 },
    ],
    expiring: [
      { id: "e1", name: "Amul Fresh Milk 1L", sku: "DRY-1042", daysLeft: 1, qty: 46 },
      { id: "e2", name: "Britannia Brown Bread", sku: "BAK-2210", daysLeft: 2, qty: 28 },
      { id: "e3", name: "Nestlé Curd 400g", sku: "DRY-1188", daysLeft: 3, qty: 62 },
      { id: "e4", name: "Fresh Chicken Breast", sku: "MET-0455", daysLeft: 4, qty: 17 },
      { id: "e5", name: "Del Monte Orange Juice", sku: "BEV-3301", daysLeft: 6, qty: 90 },
      { id: "e6", name: "Baby Spinach Pack", sku: "VEG-0912", daysLeft: 7, qty: 33 },
    ],
  },
  trends: {
    today: [
      { label: "9 AM", visitors: 120, sales: 28000 },
      { label: "10 AM", visitors: 210, sales: 51000 },
      { label: "11 AM", visitors: 265, sales: 63000 },
      { label: "12 PM", visitors: 310, sales: 74000 },
      { label: "1 PM", visitors: 288, sales: 69000 },
      { label: "2 PM", visitors: 240, sales: 58000 },
      { label: "3 PM", visitors: 305, sales: 71000 },
      { label: "4 PM", visitors: 360, sales: 86000 },
      { label: "5 PM", visitors: 420, sales: 104000 },
    ],
    "7d": [
      { label: "Mon", visitors: 1820, sales: 362000 },
      { label: "Tue", visitors: 1740, sales: 348000 },
      { label: "Wed", visitors: 1960, sales: 401000 },
      { label: "Thu", visitors: 2110, sales: 428000 },
      { label: "Fri", visitors: 2480, sales: 512000 },
      { label: "Sat", visitors: 3120, sales: 664000 },
      { label: "Sun", visitors: 2890, sales: 601000 },
    ],
    "30d": [
      { label: "W1", visitors: 12840, sales: 2510000 },
      { label: "W2", visitors: 13920, sales: 2740000 },
      { label: "W3", visitors: 15310, sales: 3120000 },
      { label: "W4", visitors: 16880, sales: 3480000 },
    ],
  },
  queues: [
    { id: "q1", name: "Counter 1", customers: 3, capacity: 10, avgWaitMins: 2.1, status: "calm" },
    { id: "q2", name: "Counter 2", customers: 5, capacity: 10, avgWaitMins: 3.8, status: "busy" },
    { id: "q3", name: "Counter 3", customers: 9, capacity: 10, avgWaitMins: 7.4, status: "overloaded" },
    { id: "q4", name: "Express Lane", customers: 1, capacity: 8, avgWaitMins: 1.2, status: "calm" },
    { id: "q5", name: "Self Checkout", customers: 6, capacity: 12, avgWaitMins: 4.6, status: "busy" },
  ],
  productInterest: [
    { id: "p1", name: "Sony WH-CH520 Headphones", category: "Electronics", views: 412, purchases: 18 },
    { id: "p2", name: "Organic Cold-Pressed Oil 1L", category: "Grocery", views: 388, purchases: 41 },
    { id: "p3", name: "Prestige Induction Cooktop", category: "Appliances", views: 341, purchases: 12 },
    { id: "p4", name: "Himalaya Face Wash Combo", category: "Personal Care", views: 305, purchases: 58 },
    { id: "p5", name: "Imported Belgian Chocolate", category: "Confectionery", views: 274, purchases: 22 },
    { id: "p6", name: "Steel Water Bottle 1L", category: "Home", views: 231, purchases: 35 },
  ],
};
