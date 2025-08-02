'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type History = {
  id: string
  created_at: string
  ingredient: string
  province: string
  recipe_name: string
  recipe_result: any
  user_id: string
}

export default function HistoryList({ initialHistories }: { initialHistories: History[] }) {
  const supabase = createClient()
  const [histories, setHistories] = useState(initialHistories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('histories').delete().match({ id })
    if (error) {
      alert('Gagal menghapus riwayat.')
      console.error(error)
    } else {
      setHistories(histories.filter((h) => h.id !== id))
    }
  }

  const handleEdit = (history: History) => {
    setEditingId(history.id)
    setNewName(history.recipe_name)
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

  return (
    <div className="space-y-4">
      {histories.length === 0 ? (
        <p>Anda belum memiliki riwayat pencarian.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {histories.map((history) => (
            <li key={history.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1 mb-4 md:mb-0">
                {editingId === history.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                ) : (
                  <h3 className="text-xl font-semibold">{history.recipe_name}</h3>
                )}
                <p className="text-sm text-gray-600">
                  Bahan: {history.ingredient} | Daerah: {history.province}
                </p>
                 <p className="text-xs text-gray-400">
                  Dicari pada: {new Date(history.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                {editingId === history.id ? (
                  <>
                    <button onClick={() => handleSave(history.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm">
                      Simpan
                    </button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm">
                      Batal
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(history)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm">
                      Ubah
                    </button>
                    <button onClick={() => handleDelete(history.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">
                      Hapus
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
