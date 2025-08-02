import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import HistoryList from '../components/HistoryList'
import Link from 'next/link'

export default async function HistoryPage() {
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

  const { data: { user } } = await supabase.auth.getUser()

  let histories = []
  if (user) {
    const { data, error } = await supabase
      .from('histories')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
        console.error("Error fetching histories:", error);
    } else {
        histories = data;
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Riwayat Pencarian Anda</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Kembali ke Pencarian
        </Link>
      </div>
      <HistoryList initialHistories={histories || []} />
    </div>
  )
}
