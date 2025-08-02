// src/app/page.tsx
import MainApp from './components/MainApp'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const handleLogout = async () => {
    'use server'
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value
            },
          },
        }
      )
    await supabase.auth.signOut()
    redirect('/') 
  }

  return (
    <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Cari Resep Nusantara</h1>
            <div>
            {session ? (
                <div className="flex items-center space-x-4">
                    <Link href="/history" className="text-blue-500 hover:underline">
                        Riwayat Pencarian
                    </Link>
                    <form action={handleLogout}>
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            ) : (
                <Link href="/account">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </Link>
            )}
            </div>
        </header>
        <MainApp />
    </div>
  )
}