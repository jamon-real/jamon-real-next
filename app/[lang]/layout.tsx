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
  title: 'Mesón Jamón Real',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon.ico',
        type: 'image/svg+xml',
      },
    ],
    apple: '/favicon.ico',
  },
}

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }]
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Language }>
}) {
  const { lang } = await params

  return (
    <>
      <Header lang={lang} />
      <main className={`font-sans antialiased ${playfair.variable} ${inter.variable}`}>
        {children}
      </main>
      <Footer lang={lang} />
      <Analytics />
    </>
  )
}
