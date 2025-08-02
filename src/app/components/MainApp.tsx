'use client'

import { useState } from 'react'
import type { User } from '@supabase/supabase-js'

// Definisikan tipe data untuk resep agar lebih terstruktur
interface Recipe {
  recipeName: string
  ingredients: string[]
  steps: string[]
}

// Daftar provinsi untuk dropdown
const provinces = [
    'Semua', 'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Banten', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat', 'Maluku', 'Maluku Utara', 'Papua Barat', 'Papua'
];

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ChefHatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 18.5a2.5 2.5 0 0 1-5 0V16h5v2.5Z" /><path d="M15 18.5a2.5 2.5 0 0 1-5 0V16h5v2.5Z" />
        <path d="M20 18.5a2.5 2.5 0 0 1-5 0V16h5v2.5Z" /><path d="M5 16v-3.5a2.5 2.5 0 0 1 5 0V16" />
        <path d="M10 16v-3.5a2.5 2.5 0 0 1 5 0V16" /><path d="M15 16v-3.5a2.5 2.5 0 0 1 5 0V16" />
        <path d="M5 12.5V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3.5" />
    </svg>
)

// Komponen utama aplikasi
export default function MainApp({ user }: { user: User | null }) {
  const [loading, setLoading] = useState(false)
  const [ingredient, setIngredient] = useState('')
  const [province, setProvince] = useState('Semua')
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setRecipe(null)

    try {
      // 1. Validasi bahan (opsional, bisa diaktifkan jika API ada)
      // const validationResponse = await fetch('/api/validate', { ... });

      // 2. Hasilkan resep
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredient, province }),
      })

      if (!generateResponse.ok) {
        throw new Error('Gagal menghasilkan resep. Coba lagi nanti.')
      }

      const recipeData: Recipe = await generateResponse.json()
      setRecipe(recipeData)

      // 3. Simpan ke riwayat jika pengguna sudah login
      if (user) {
        await fetch('/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ingredient,
            province,
            recipeName: recipeData.recipeName,
            recipeResult: recipeData,
          }),
        })
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan yang tidak diketahui.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8 space-y-8">
      {/* Kartu Input */}
      <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cari Resep Ajaibmu</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Masukkan bahan utama dan pilih asal daerah resep yang kamu inginkan.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Bahan Utama</label>
            <input
              id="ingredient"
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Contoh: Ayam, Nasi, Telur"
              className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Asal Daerah</label>
            <select
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
        <button
            onClick={handleSearch}
            disabled={loading || !ingredient}
            className="mt-6 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {loading ? <LoadingSpinner /> : 'Cari Resep'}
        </button>
      </div>

      {/* Hasil Resep */}
      <div className="min-h-[300px]">
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-md" role="alert">
                <p className="font-bold">Terjadi Kesalahan</p>
                <p>{error}</p>
            </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 py-16">
            <LoadingSpinner />
            <p className="mt-4 text-lg">Sedang meracik resep terbaik untukmu...</p>
          </div>
        )}

        {recipe && (
          <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{recipe.recipeName}</h2>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Bahan-bahan:</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <span className="text-blue-500 mr-2">✓</span>
                        {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Langkah-langkah:</h3>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm mr-4 mt-1">{index + 1}</div>
                      <p className="flex-1 text-gray-700 dark:text-gray-300">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {!loading && !recipe && !error && (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 py-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                <ChefHatIcon className="h-16 w-16 mb-4" />
                <h3 className="text-xl font-semibold">Resepmu Akan Muncul di Sini</h3>
                <p className="max-w-xs mt-1">Masukkan bahan yang kamu punya untuk memulai petualangan rasa!</p>
            </div>
        )}
      </div>
    </div>
  )
}
