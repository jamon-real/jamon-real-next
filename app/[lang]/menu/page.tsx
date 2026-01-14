import { getCategories, getProducts } from "@/lib/sanity"
import { CategorySection } from "@/components/category-section"
import type { Metadata } from "next"
import { getTranslations, type Language } from "@/lib/translations"

export const metadata: Metadata = {
  title: "Nuestra Carta - Mesón Jamón Real",
}

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }]
}

export default async function MenuPage({ params }: { params: Promise<{ lang: Language }> }) {
  const resolvedParams = await params
  const { lang } = resolvedParams
  const t = getTranslations(lang)

  const [categories, products] = await Promise.all([getCategories(), getProducts()])

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-b from-muted/30 to-background py-20 border-b border-border">
        <div className="container px-4 text-center mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            {t.menu.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.menu.subtitle}</p>
        </div>
      </section>

      <section className="flex-1 py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto px-4 md:px-12 lg:px-24">
            {categories.map((category) => (
              <CategorySection key={category._id} category={category} products={products} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/20 py-12 border-t border-border">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">*{t.menu.allergenInfo}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
