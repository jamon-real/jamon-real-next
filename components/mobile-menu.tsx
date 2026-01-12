"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { Language } from "@/lib/translations"
import { getTranslations } from "@/lib/translations"
import { Menu } from "lucide-react"

interface MobileMenuProps {
  lang: Language
}

export function MobileMenu({ lang }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = getTranslations(lang)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 flex flex-col pt-8">
        <nav className="flex flex-col items-center gap-2 px-6">
          <Link
            href={`/${lang}`}
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2 text-center w-full"
          >
            {t.nav.home}
          </Link>
          <Link
            href={`/${lang}/menu`}
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2 text-center w-full"
          >
            {t.nav.menu}
          </Link>
          <Link
            href={`/${lang}/location`}
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2 text-center w-full"
          >
            {t.nav.location}
          </Link>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2">
            <a href="tel:+34954563998" onClick={() => setIsOpen(false)}>{t.nav.reserve}</a>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
