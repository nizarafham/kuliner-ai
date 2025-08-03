import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Kuliner AI - Resep dari Bahan di Rumah',
  description: 'Ciptakan resep masakan lezat dari bahan-bahan yang ada di dapurmu dengan bantuan AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Tambahkan link favicon di sini */}
        <link rel="icon" href="/logos.png" type="image/png" />
      </head>
      <body
        className={`font-sans ${inter.variable} bg-background text-foreground`}
      >
        <div className="relative flex min-h-dvh flex-col bg-background">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
