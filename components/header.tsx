import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { LanguageSwitcher } from "./language-switcher"
import { MobileMenu } from "./mobile-menu"
import type { Language } from "@/lib/translations"
import { getTranslations } from "@/lib/translations"

interface HeaderProps {
  lang?: Language
}

export function Header({ lang = "es" }: HeaderProps) {
  const t = getTranslations(lang)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between px-4 mx-auto">
        <Link href={`/${lang}`} className="flex items-center space-x-3">
          <span className="font-serif text-2xl font-bold text-foreground tracking-tight">Jamón Real</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={`/${lang}`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.home}
          </Link>
          <Link
            href={`/${lang}/menu`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.menu}
          </Link>
          <Link
            href={`/${lang}/location`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.location}
          </Link>
          <LanguageSwitcher currentLang={lang} />
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="tel:+34954563998">{t.nav.reserve}</a>
          </Button>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher currentLang={lang} />
          <MobileMenu lang={lang} />
        </div>
      </div>
    </header>
  )
}
