import { Hero } from "@/components/hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getProducts, getGalleryImages, getFeaturedProducts } from "@/lib/sanity"
import { ProductCard } from "@/components/product-card"
import { Gallery } from "@/components/gallery"
import { UtensilsCrossed, Award, SmilePlus } from "lucide-react"
import { getTranslations, type Language } from "@/lib/translations"


export default async function HomePage({ params }: { params: Promise<{ lang: Language }> }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const t = getTranslations(lang)

  const [featuredProducts, galleryImages] = await Promise.all([
    getFeaturedProducts(),
    getGalleryImages()
  ])

  return (
    <div className="flex flex-col">
      <Hero lang={lang} />

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <UtensilsCrossed className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{t.home.traditionalCuisine}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.home.traditionalCuisineDesc}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{t.home.premiumProducts}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.home.premiumProductsDesc}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <SmilePlus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{t.home.cozyAtmosphere}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.home.cozyAtmosphereDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-muted/20">
        <div className="container px-4 mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
            {t.home.historyTitle}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p className="text-center">{t.home.historyText1}</p>
            <p className="text-center">{t.home.historyText2}</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container px-4 mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
              {t.home.specialtiesTitle}
            </h2>
            <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
              {t.home.specialtiesSubtitle}
            </p>

            <div className="max-w-4xl mx-auto space-y-2 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} showAllergens={false} />
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                <Link href={`/${lang}/menu`}>{t.home.viewFullMenu}</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-24 bg-muted/20">
          <div className="container px-4 mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
              {t.home.galleryTitle}
            </h2>
            <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
              {t.home.gallerySubtitle}
            </p>

            <div className="max-w-6xl mx-auto">
              <Gallery images={galleryImages} />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">{t.home.ctaTitle}</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.home.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90 px-8"
            >
              <Link href={`/${lang}/location`}>{t.home.ctaHowToGet}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent px-8"
            >
              <a href="tel:+34954563998">{t.home.ctaCallReserve}</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
