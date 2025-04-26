import { DashboardStats } from "@/components/dashboard/stats"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductGrid } from "@/components/products/product-grid"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardStats />
      <div className="flex flex-col gap-6">
        <ProductFilters />
        <ProductGrid />
      </div>
    </div>
  )
}
