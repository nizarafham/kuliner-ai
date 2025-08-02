'use client'
import { useState } from 'react'

interface Recipe {
  recipeName: string
  ingredients: string[]
  steps: string[]
}

const provinces = [
    'Semua', 'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Banten', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat', 'Maluku', 'Maluku Utara', 'Papua Barat', 'Papua'
];


export default function MainApp() {
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
      // 1. Validate ingredient
      const validationResponse = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredient }),
      })

      const validationData = await validationResponse.json()
      if (!validationData.valid) {
        setError('Bahan makanan tidak valid.')
        setLoading(false)
        return
      }

      // 2. Generate recipe
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredient, province }),
      })

      if (!generateResponse.ok) {
        throw new Error('Gagal menghasilkan resep.')
      }

      const recipeData: Recipe = await generateResponse.json()
      setRecipe(recipeData)

      // 3. Save to history
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
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Contoh: Ayam"
          className="p-2 border rounded md:col-span-1"
        />
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="p-2 border rounded md:col-span-1 bg-white"
        >
          {provinces.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          disabled={loading || !ingredient}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 md:col-span-1"
        >
          {loading ? 'Mencari...' : 'Cari Resep'}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      {recipe && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold mb-2">{recipe.recipeName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Bahan-bahan:</h3>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Langkah-langkah:</h3>
              <ol className="list-decimal list-inside space-y-2">
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
