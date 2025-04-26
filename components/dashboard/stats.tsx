"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart3, DollarSign, Package, ShoppingCart } from "lucide-react"

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products")
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export function DashboardStats() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-24" />
                </CardTitle>
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  // Calculate statistics
  const totalProducts = products?.length || 0
  const totalValue = products?.reduce((acc, product) => acc + product.price, 0) || 0
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0
  const categoriesCount = new Set(products?.map((product) => product.category)).size || 0

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      description: "Products in inventory",
      icon: Package,
    },
    {
      title: "Average Price",
      value: `$${averagePrice.toFixed(2)}`,
      description: "Per product",
      icon: DollarSign,
    },
    {
      title: "Total Value",
      value: `$${totalValue.toFixed(2)}`,
      description: "Inventory value",
      icon: ShoppingCart,
    },
    {
      title: "Categories",
      value: categoriesCount,
      description: "Product categories",
      icon: BarChart3,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
