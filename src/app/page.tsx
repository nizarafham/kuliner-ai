// src/app/page.tsx
import MainApp from './components/MainApp'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  )

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()


  const handleLogout = async () => {
    'use server'
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                )
              } catch {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing user sessions.
              }
            },
          },
        }
      )
    
    try {
      const { error } = await supabase.auth.signOut({
        scope: 'global'
      })
      
      if (error) {
        console.error('Logout error:', error)
      } else {
        console.log('Logout successful')
      }
    } catch (error) {
      console.error('Unexpected logout error:', error)
    }
    
    redirect('/') 
  }

  return (
    <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Cari Resep Nusantara</h1>
            <div>
            {user && !userError ? (
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600 text-sm">
                        Halo, {user.email?.split('@')[0]}!
                    </span>
                    <Link href="/history" className="text-blue-500 hover:underline">
                        Riwayat Pencarian
                    </Link>
                    <Link href="/account" className="text-blue-500 hover:underline">
                        Akun Saya
                    </Link>
                    <form action={handleLogout}>
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <Link
                      href="/login"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block transition-colors"
                    >
                      Login
                    </Link>
                    <span className="text-gray-400">atau</span>
                    <Link
                      href="/register"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block transition-colors"
                    >
                      Daftar
                    </Link>
                </div>
            )}
            </div>
        </header>
        <MainApp user={user} />
    </div>
  )
}