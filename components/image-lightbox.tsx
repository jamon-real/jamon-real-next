"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"


interface ImageLightboxProps {
  src: string
  alt: string
  title?: string
  hoverText?: string
}


export function ImageLightbox({ src, alt, title, hoverText }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const altText = alt || title || "Imagen de producto";

  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleKeyDown])

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted group cursor-pointer"
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={altText}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-medium">{hoverText}</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <Button
            type="button"
            aria-label="Cerrar"
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white"
            style={{ zIndex: 10 }}
            onClick={e => {
              e.stopPropagation();
              setIsOpen(false)
            }}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
            <Image
              src={src || "/placeholder.svg"}
              alt={altText}
              fill
              className="object-contain"
              onClick={e => e.stopPropagation()}
            />
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center">
                <p className="font-serif text-lg">{title}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
