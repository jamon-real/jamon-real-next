import type { Product, Category } from "@/lib/sanity"
import { ProductCard } from "./product-card"

interface CategorySectionProps {
  category: Category
  products: Product[]
}

export function CategorySection({ category, products }: CategorySectionProps) {
  const categoryProducts = products.filter((p) => p.category._id === category._id)

  if (categoryProducts.length === 0) return null

  // Detectar idioma por window.location.pathname
  const lang = typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? 'en' : 'es'
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          {lang === 'en' ? category.name_en : category.name_es}
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
