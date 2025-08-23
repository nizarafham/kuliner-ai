import { createSupabaseServer } from '../../utils/supabase/server'
import HistoryList from '../components/HistoryList'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function HistoryPage() {
  const supabase = createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8 text-center">
      
      </div>
    )
  }

  const { data: histories, error } = await supabase
    .from('histories')
    .select('*')
    .eq('user_id', user.id) 
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching histories:", error);
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Riwayat Pencarian</h1>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none"
        >
          &larr; Kembali
        </Link>
      </div>
      <HistoryList initialHistories={histories || []} />
    </div>
  )
}
