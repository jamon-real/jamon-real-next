import type { Product, Category } from "@/lib/sanity"
import { ProductCard } from "./product-card"


import type { Language } from "@/lib/translations"

interface CategorySectionProps {
  category: Category
  products: Product[]
}

export function CategorySection({ category, products }: CategorySectionProps) {
  const categoryProducts = products.filter((p) => p.category._id === category._id)

  if (categoryProducts.length === 0) {
    console.warn(`No products found for category: ${category.name}`)
    return null
  }
  console.log(JSON.stringify(category, null, 2))
  console.log(`Rendering category: ${category.name} with ${categoryProducts.length} products.`)

  return (
    <section className="mb-8">
      <div className="mb-2">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          {category.name}
        </h2>
      </div>
      <div className="space-y-2">
        {categoryProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}
