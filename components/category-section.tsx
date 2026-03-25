import type { Product, Category } from "@/lib/content"
import { ProductCard } from "./product-card"

interface CategorySectionProps {
  category: Category
  products: Product[]
}

export function CategorySection({ category, products }: CategorySectionProps) {
  const categoryProducts = products.filter((p) => p.category._id === category._id)

  if (categoryProducts.length === 0) {
    return null
  }

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
