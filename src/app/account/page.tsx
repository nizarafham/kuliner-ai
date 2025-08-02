// app/account/page.tsx
import AuthForm from '../components/AuthForm'
import { createServerClient } from '@supabase/ssr'
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

  // Jika tidak ada user yang valid, tampilkan form login
  if (!user || userError) {
    return (
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Login / Register</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Kembali ke Beranda
          </Link>
        </header>
        
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <AuthForm viewType="sign_in" />
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
      }
    } catch (error) {
      console.error('Unexpected logout error:', error)
    }
    
    redirect('/')
  }

  return (
    <div className="container mx-auto p-4">
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
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Logout
          </button>
        </form>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informasi Akun */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Informasi Akun</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">User ID</label>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded">{user.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Terakhir login</label>
              <p className="text-sm">
                {user.last_sign_in_at 
                  ? new Date(user.last_sign_in_at).toLocaleString('id-ID')
                  : 'Tidak tersedia'
                }
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Dibuat pada</label>
              <p className="text-sm">
                {new Date(user.created_at).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        {/* Statistik Penggunaan */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Aktivitas</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Pencarian</span>
              <span className="font-semibold">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Resep Tersimpan</span>
              <span className="font-semibold">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Daerah Favorit</span>
              <span className="font-semibold">-</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Statistik akan diperbarui setelah Anda mulai menggunakan aplikasi.
          </p>
        </div>
      </div>
    </div>
  )
}