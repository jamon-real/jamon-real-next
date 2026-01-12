import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"
import { getTranslations, type Language } from "@/lib/translations"

interface FooterProps {
  lang?: Language
}

export function Footer({ lang = "es" }: FooterProps) {
  const t = getTranslations(lang)

  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="container px-4 py-8 mx-auto flex flex-col items-center">
        <div className="w-full max-w-5xl grid gap-12 md:grid-cols-3 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-3xl font-bold mb-4">{t.brand.name}</h3>
            <p className="text-sm text-background/70 leading-relaxed">{t.brand.tagline}</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-4">{t.footer.contact}</h4>
            <div className="space-y-3 text-sm text-background/80">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  C/ Pastor y Landero, 22
                  <br />
                  Sevilla
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+34954563998" className="hover:text-primary transition-colors">
                  +34 954 56 39 98
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="mailto:jamonreal@jamonreal.es" className="hover:text-primary transition-colors">
                  jamonreal@jamonreal.es
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-4">{t.footer.links}</h4>
            <div className="space-y-3 text-sm">
              <Link href={`/${lang}`} className="block text-background/80 hover:text-primary transition-colors">
                {t.footer.home}
              </Link>
              <Link href={`/${lang}/menu`} className="block text-background/80 hover:text-primary transition-colors">
                {t.footer.ourMenu}
              </Link>
              <Link
                href={`/${lang}/location`}
                className="block text-background/80 hover:text-primary transition-colors"
              >
                {t.footer.locationHours}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center text-sm text-background/60 w-full">
          <p>
            &copy; {new Date().getFullYear()} Jamón Real. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
