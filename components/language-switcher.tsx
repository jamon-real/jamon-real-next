"use client"


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { Globe, Check } from "lucide-react"

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (lang: string) => {
    const newPath = pathname.replace(/^\/(es|en)/, `/${lang}`)
    router.push(newPath)
  }

  const languages = [
    { code: "es", label: "ES", name: "Español", flag: "🇪🇸" },
    { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
  ]

  const current = languages.find(l => l.code === currentLang) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 px-3 border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground"
          aria-label="Cambiar idioma"
        >
          <span className="font-semibold text-base">{current.flag}</span>
          <span className="font-semibold text-base">{current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.label} - {lang.name}</span>
            {currentLang === lang.code && <Check className="ml-auto h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
