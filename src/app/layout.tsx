import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: 'Kuliner AI — Resep Nusantara dari Bahan di Rumah',
    template: '%s · Kuliner AI'
  },
  description: 'Generate resep masakan Nusantara dari bahan yang kamu punya, lengkap dengan takaran dan langkah.Gratis untuk mulai.',
  openGraph: {
    title: 'Kuliner AI',
    description: 'Generate resep Nusantara dari bahan yang kamu punya',
    url: defaultUrl,
    images: ['/kuliner-ai-og.png']
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kulinerai',
    title: 'Kuliner AI',
    description: 'Generate resep Nusantara dari bahan yang kamu punya',
    images: ['/kuliner-ai-og.png']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`min-h-dvh bg-white text-gray-900 antialiased ${inter.className}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
