import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getTranslations, type Language } from "@/lib/translations"

interface HeroProps {
  lang?: Language
}

export function Hero({ lang = "es" }: HeroProps) {
  const t = getTranslations(lang)

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-foreground">
      <div className="absolute inset-0 z-0">
        <img
          src="/jamon-real2.jpg"
          alt="Restaurant interior"
          className="h-full w-full object-cover opacity-20"
        />
      </div>

      <div className="container relative z-10 px-4 text-center mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-6xl font-bold text-background md:text-7xl lg:text-8xl mb-6 tracking-tight text-balance">
            {t.hero.title}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-background/80 md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
              <Link href={`/${lang}/menu`}>{t.hero.viewMenu}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/30 text-background hover:bg-background/10 text-base px-8 bg-transparent"
            >
              <Link href={`/${lang}/location`}>{t.hero.howToGet}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
