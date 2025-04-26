"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Box, Home, Package, Settings, ShoppingCart, Users } from "lucide-react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    href: "#",
    icon: Package,
  },
  {
    title: "Orders",
    href: "#",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "#",
    icon: Users,
  },
  {
    title: "Inventory",
    href: "#",
    icon: Box,
  },
  {
    title: "Analytics",
    href: "#",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings,
  },
]

interface DashboardSidebarProps {
  onNavItemClick?: () => void
}

export function DashboardSidebar({ onNavItemClick }: DashboardSidebarProps = {}) {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4 md:h-16 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>E-Commerce</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {sidebarLinks.map((link, index) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={onNavItemClick}
              >
                <link.icon className="h-4 w-4" />
                {link.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
