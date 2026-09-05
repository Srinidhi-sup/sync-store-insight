# StorePulse Dashboard

Build a responsive retail analytics dashboard (React + Tailwind CSS) called "RetailSync" 

for a store owner to monitor CCTV + POS data in real time.

Layout:

- Left sidebar: nav (Dashboard, Live Store, Inventory, Billing, Customer Analytics, 

  Queue Monitoring, Alerts, Reports, Settings)

- Top bar: search, notification bell with badge count, store owner profile

- Header: greeting, current date/time, system status indicator (green dot)

Main dashboard sections:

1. Stat cards row: Total Visitors Today, Sales Today (₹), Conversion Rate, 

   Active Queue Count, Low/Expiring Stock, Alerts Today (each with % change and mini sparkline)

2. Live Store Feed: video placeholder with "LIVE" badge, timestamp, camera label

3. AI Alerts panel: list of alerts with severity badges (Critical/High/Medium), 

   description, camera source, timestamp

4. Inventory Status: donut chart (In Stock/Low Stock/Out of Stock) + 

   "Expiring Soon" list with days-left badges

5. Footfall & Sales Trend: dual-axis line chart (visitors vs sales) with time filter

6. Queue Monitoring: horizontal progress bars per checkout counter, 

   customer count, avg wait time

7. Top Product Interest: list of most-viewed-but-not-purchased items with view/purchase counts

Use a dark theme with glassmorphism cards, purple/teal accent colors, rounded corners, 

and subtle gradients. Make all data mock/dummy for now, structured so it can later be 

replaced with real API calls (use a single `dashboardData` object/hook to fetch everything).

Use Recharts for charts. Make it fully responsive.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sync-store-insight.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/909cdf69-6c86-40e9-89d2-9311d5bacabd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
