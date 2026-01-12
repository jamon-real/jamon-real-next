import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Language } from "@/lib/translations"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Mesón Jamón Real - Restaurante Tradicional Español en Sevilla",
  description:
    "Mesón tradicional especializado en jamones ibéricos y cocina española. Más de 30 años de tradición en el corazón de Sevilla.",
  keywords: ["jamón ibérico", "restaurante sevilla", "cocina española", "mesón tradicional", "jamón de bellota"],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }]
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: Language }
}>) {
  const resolvedParams = typeof params.then === "function" ? await params : params
  const { lang } = resolvedParams

  return (
    <>
      <Header lang={lang} />
      <main className={`font-sans antialiased ${playfair.variable} ${inter.variable}`}>{children}</main>
      <Footer lang={lang} />
      <Analytics />
    </>
  )
}
