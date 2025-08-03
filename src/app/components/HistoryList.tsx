'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import HistoryItem from './HistoryItem'
import type { History } from '@/types' 

// --- Komponen Ikon ---
const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
)

// --- Komponen Utama ---
export default function HistoryList({ initialHistories }: { initialHistories: History[] }) {
  const supabase = createClient()
  const [histories, setHistories] = useState(initialHistories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) {
        return;
    }
    const { error } = await supabase.from('histories').delete().match({ id })
    if (error) {
      alert('Gagal menghapus riwayat.')
      console.error(error)
    } else {
      setHistories(histories.filter((h) => h.id !== id))
    }
  }

  const handleSave = async (id: string) => {
    const { error } = await supabase
      .from('histories')
      .update({ recipe_name: newName })
      .match({ id })

    if (error) {
      alert('Gagal menyimpan perubahan.')
      console.error(error)
    } else {
      setHistories(
        histories.map((h) => (h.id === id ? { ...h, recipe_name: newName } : h))
      )
      setEditingId(null)
    }
  }

  if (histories.length === 0) {
    return (
      <div className="text-center py-16 px-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
        <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Riwayat Kosong</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Anda belum pernah mencari resep. Mulai cari sekarang!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {histories.map((history) => (
        <HistoryItem
            key={history.id}
            history={history}
            isEditing={editingId === history.id}
            isExpanded={expandedId === history.id}
            newName={newName}
            setNewName={setNewName}
            onToggleExpand={() => setExpandedId(expandedId === history.id ? null : history.id)}
            onEdit={() => {
                setEditingId(history.id);
                setNewName(history.recipe_name);
            }}
            onSave={() => handleSave(history.id)}
            onCancel={() => setEditingId(null)}
            onDelete={() => handleDelete(history.id)}
        />
      ))}
    </div>
  )
}
