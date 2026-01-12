"use client"

import type { GalleryImage } from "@/lib/sanity"
import { ImageLightbox } from "./image-lightbox"

interface GalleryProps {
  images: GalleryImage[]
}

export function Gallery({ images }: GalleryProps) {
  if (!images || images.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <ImageLightbox
          key={image._id}
          src={image.image.asset.url || "/placeholder.svg"}
          alt={image.alt || image.title}
          title={image.title}
        />
      ))}
    </div>
  )
}
