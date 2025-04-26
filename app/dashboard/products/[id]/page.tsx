"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Edit, Star, Trash } from "lucide-react"
import Image from "next/image"

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="aspect-square h-full w-full rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Error Loading Product</CardTitle>
          </CardHeader>
          <CardContent>
            <p>There was an error loading the product details. Please try again.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.back()}>Go Back</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Product Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl border bg-background p-6">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={400}
            className="max-h-[400px] w-auto object-contain"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                {product.category}
              </span>
              <div className="flex items-center">
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating.rate)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.rating.rate}) - {product.rating.count} reviews
                </span>
              </div>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          <div>
            <h3 className="text-lg font-medium">Description</h3>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Stock Status</h3>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  product.rating.count > 0 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {product.rating.count > 0  ? "In Stock" : "Out of Stock"}
              </span>
              <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100)} units available</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Button>
            <Button variant="destructive" className="flex-1">
              <Trash className="mr-2 h-4 w-4" />
              Delete Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
