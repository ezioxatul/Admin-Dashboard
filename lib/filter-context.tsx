"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface Filters {
  search: string
  category: string
  minPrice: number
  maxPrice: number
  rating: number | null
}

interface FilterContextType {
  filters: Filters
  setFilters: (filters: Filters) => void
  resetFilters: () => void
}

const defaultFilters: Filters = {
  search: "",
  category: "",
  minPrice: 0,
  maxPrice: 1000,
  rating: null,
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
