import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseServer } from '@/utils/supabase/server'

export default async function Navbar(){
  const supabase = createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/kuliner-ai.png" alt="Kuliner AI" width={132} height={32} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {user && <Link href="/history" className="hover:text-gray-900">Riwayat</Link>}
          {!user && <Link href="/login" className="hover:text-gray-900">Login</Link>}
          {!user && <Link href="/register" className="rounded-md bg-[#d35a2f] px-4 py-2 text-white font-semibold hover:bg-[#b94e29]">Daftar</Link>}
          {user && (
            <form action="/auth/sign-out" method="post">
              <button className="hover:text-gray-900">Logout</button>
            </form>
          )}
        </nav>
      </div>
    </header>
  )
}