"use client"

import type { Product } from "@/lib/sanity"
import { getTranslations, type Language } from "@/lib/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ImageLightbox } from "./image-lightbox"
import { ImageIcon } from "lucide-react"

const allergenIcons: Record<string, string> = {
  gluten: "🌾",
  lactosa: "🥛",
  huevo: "🥚",
  pescado: "🐟",
  "frutos secos": "🥜",
  sulfitos: "🍷",
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [showImage, setShowImage] = useState(false)
  const hasImage = !!product.image && !!product.image.asset?.url
  // Detectar idioma por window.location.pathname
  const lang: Language = typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? 'en' : 'es'

  return (
    <>
      <div className="py-4 border-b border-border last:border-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg font-semibold mb-1">{lang === 'en' ? product.name_en : product.name_es}</h3>
            {(lang === 'en' ? product.description_en : product.description_es) && (
              <p className="text-sm text-muted-foreground mb-2">
                {lang === 'en' ? product.description_en : product.description_es}
              </p>
            )}
            {product.allergens && product.allergens.length > 0 && (
              <div className="mt-2">
                <span className="block font-semibold text-xs mb-1">
                  {lang === 'en' ? 'Allergens:' : 'Alérgenos:'}
                </span>
                <div className="flex flex-wrap gap-1 items-center">
                  {product.allergens.map((allergen) => (
                    <Badge key={allergen._id} variant="secondary" className="text-xs">
                      {lang === 'en' ? allergen.name_en : allergen.name_es}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          {hasImage && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImage((prev) => !prev)}
              className={`flex-shrink-0${showImage ? ' bg-muted' : ''}`}
              aria-pressed={showImage}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {hasImage && showImage && (
        <ImageLightbox
          src={product.image!.asset.url}
          alt={product.image!.alt || (lang === 'en' ? product.name_en : product.name_es)}
          title={lang === 'en' ? product.name_en : product.name_es}
        />
      )}
    </>
  )
}
