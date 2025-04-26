"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useFilters } from "@/lib/filter-context"
import type { Product } from "@/lib/types"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 8

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products")
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export function ProductGrid() {
  const { filters } = useFilters()
  const [page, setPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  // Apply filters
  useEffect(() => {
    if (!products.length) return

    let result = [...products]

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
      )
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((product) => product.category === filters.category)
    }

    // Apply price range filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      result = result.filter(
        (product) =>
          product.price >= (filters.minPrice || 0) && product.price <= (filters.maxPrice || Number.POSITIVE_INFINITY),
      )
    }

    // Apply rating filter
    if (filters.rating) {
      result = result.filter((product) => product.rating.rate >= filters.rating!)
    }

    setFilteredProducts(result)
    setPage(1) // Reset to first page when filters change
  }, [filters, products])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square h-full w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-lg font-semibold">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search term to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="text-sm font-medium">
              Page {page} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
