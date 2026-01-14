"use client"

import type { Product } from "@/lib/sanity"
import { getTranslations, type Language } from "@/lib/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ImageLightbox } from "./image-lightbox"
import { ImageIcon } from "lucide-react"

interface ProductCardProps {
  product: Product
  showAllergens?: boolean
}


export function ProductCard({ product, showAllergens = true }: ProductCardProps) {
  const [showImage, setShowImage] = useState(false)
  const hasImage = !!product.image && !!product.image.asset?.url

  return (
    <>
      <div className="py-4 border-b border-border last:border-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg font-semibold mb-1">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-muted-foreground mb-2">
                {product.description}
              </p>
            )}
            {showAllergens && product.allergens && product.allergens.length > 0 && (
              <div className="mt-2">
                <span className="block font-semibold text-xs mb-1">
                  Alérgenos (*):
                </span>
                <div className="flex flex-wrap gap-1 items-center">
                  {product.allergens.map((allergen) => (
                    <Badge key={allergen._id} variant="secondary" className="text-xs">
                      {allergen.name}
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
          alt={product.image!.alt || product.name}
          title={product.name}
          hoverText={"Zoom"}
        />
      )}
    </>
  )
}
