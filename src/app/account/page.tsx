// app/account/page.tsx
import AuthForm from '../components/AuthForm'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AccountPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return <AuthForm />
  }

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
            set(name: string, value: string, options: CookieOptions) {
              cookieStore.set({ name, value, ...options })
            },
            remove(name: string, options: CookieOptions) {
              cookieStore.delete({ name, ...options })
            },
          },
        }
      )
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="container mx-auto p-4">
        <>
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-6">
                <h1 className="text-3xl font-bold">Akun Saya</h1>
                <Link href="/history" className="text-blue-500 hover:underline pt-1">
                    Riwayat Pencarian
                </Link>
                <Link href="/" className="text-blue-500 hover:underline pt-1">
                    Cari Resep
                </Link>
            </div>
            <form action={handleLogout}>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </form>
          </header>
          <div>
            <p>Selamat datang! Anda sudah masuk ke akun Anda.</p>
          </div>
        </>
    </div>
  )
}