import { Eye, ShoppingCart } from "lucide-react";

import type { ProductInterest as ProductInterestItem } from "@/data/dashboardData";

export function ProductInterest({ products }: { products: ProductInterestItem[] }) {
  return (
    <section className="glass p-5">
      <h2 className="text-base font-semibold">Top Product Interest</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Most viewed at shelf but rarely purchased
      </p>

      <ul className="mt-4 space-y-3">
        {products.map((product) => {
          const rate = Math.round((product.purchases / product.views) * 100);
          return (
            <li key={product.id} className="rounded-xl border border-border bg-secondary/30 p-3.5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{product.name}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {product.category}
                  </span>
                </span>
                <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {rate}% convert
                </span>
              </div>
              <div className="mt-2.5 flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" /> {product.views} views
                </span>
                <span className="flex items-center gap-1">
                  <ShoppingCart className="h-3 w-3" /> {product.purchases} purchases
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/70">
                <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${rate}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
