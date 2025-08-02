// app/page.tsx
import AuthForm from './components/AuthForm'
import MainApp from './components/MainApp'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
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
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error)
    }
    redirect('/')
  }

  return (
    <div className="container mx-auto p-4">
      {session ? (
        <>
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Resep Makanan</h1>
            <form action={handleLogout}>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </form>
          </header>
          <MainApp />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  )
}
