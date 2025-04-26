"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useFilters } from "@/lib/filter-context"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

async function getCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories")
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}

export function ProductFilters() {
  const { filters, setFilters, resetFilters } = useFilters()
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [searchValue, setSearchValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  // Update search filter with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ ...filters, search: searchValue })
    }, 300)

    return () => clearTimeout(timer)
  }, [searchValue, setFilters])

  // Update price range filter
  useEffect(() => {
    setFilters({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    })
  }, [priceRange])

  // Initialize search value from filters
  useEffect(() => {
    setSearchValue(filters.search || "")
  }, [filters.search])

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== null && value !== "" && value !== undefined,
  ).length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchValue("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Select
            value={filters.category || "all"}
            onValueChange={(value) => setFilters({ ...filters, category: value === "all" ? "" : value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down products by applying filters</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Price Range</Label>
                    <span className="text-sm">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 1000]}
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Rating</Label>
                  <Select
                    value={filters.rating?.toString() || "0"}
                    onValueChange={(value) =>
                      setFilters({ ...filters, rating: value === "0" ? null : Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="2">2+ Stars</SelectItem>
                      <SelectItem value="1">1+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Category</Label>
                  <Select
                    value={filters.category || "all"}
                    onValueChange={(value) => setFilters({ ...filters, category: value === "all" ? "" : value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetFilters()
                      setPriceRange([0, 1000])
                      setIsOpen(false)
                    }}
                  >
                    Reset
                  </Button>
                  <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {filters.category}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => setFilters({ ...filters, category: "" })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove category filter</span>
              </Button>
            </Badge>
          )}
          {filters.rating && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Rating: {filters.rating}+ Stars
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => setFilters({ ...filters, rating: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove rating filter</span>
              </Button>
            </Badge>
          )}
          {(filters.minPrice > 0 || filters.maxPrice < 1000) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Price: ${filters.minPrice} - ${filters.maxPrice}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => {
                  setFilters({ ...filters, minPrice: 0, maxPrice: 1000 })
                  setPriceRange([0, 1000])
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove price filter</span>
              </Button>
            </Badge>
          )}
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {filters.search}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => {
                  setFilters({ ...filters, search: "" })
                  setSearchValue("")
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove search filter</span>
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => {
              resetFilters()
              setPriceRange([0, 1000])
              setSearchValue("")
            }}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}
