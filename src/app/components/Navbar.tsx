"use client"

import Link from "next/link"
import Image from "next/image"
import { createBrowserClient } from "@supabase/ssr"
import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/kuliner-ai.png" alt="Kuliner AI" width={132} height={32} />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="#features" className="hover:text-gray-900">
            Fitur
          </Link>
          <Link href="#demo" className="hover:text-gray-900">
            Demo
          </Link>
          {user && (
            <Link href="/history" className="hover:text-gray-900">
              Riwayat
            </Link>
          )}
          {!user && (
            <Link href="/login" className="hover:text-gray-900">
              Login
            </Link>
          )}
          {!user && (
            <Link
              href="/register"
              className="rounded-md bg-[#d35a2f] px-4 py-2 text-white font-semibold hover:bg-[#b94e29]"
            >
              Daftar
            </Link>
          )}
          {user && (
            <form action="/auth/sign-out" method="post">
              <button className="hover:text-gray-900">Logout</button>
            </form>
          )}
        </nav>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm text-gray-600">
            <Link href="#features" className="hover:text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              Fitur
            </Link>
            <Link href="#demo" className="hover:text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              Demo
            </Link>
            {user && (
              <Link href="/history" className="hover:text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
                Riwayat
              </Link>
            )}
            {!user && (
              <Link href="/login" className="hover:text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
            {!user && (
              <Link
                href="/register"
                className="rounded-md bg-[#d35a2f] px-4 py-3 text-white font-semibold hover:bg-[#b94e29] text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Daftar
              </Link>
            )}
            {user && (
              <form action="/auth/sign-out" method="post">
                <button className="hover:text-gray-900 py-2 text-left w-full">Logout</button>
              </form>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
