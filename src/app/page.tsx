import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import MainApp from './components/MainApp'

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
    data: { user },
  } = await supabase.auth.getUser()

  // Selalu tampilkan aplikasi utama.
  // Jika pengguna tidak login, `user` akan bernilai `null`.
  // Komponen MainApp akan menangani kasus ini (misalnya, dengan tidak menyimpan riwayat).
  return <MainApp user={user} />
}
