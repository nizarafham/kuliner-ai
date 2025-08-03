'use client'

import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import RecipeSearchForm from './RecipeSearchForm'
import RecipeResult from './RecipeResult'

interface Recipe {
  recipeName: string
  ingredients: string[]
  steps: string[]
}

const provinces = [
    'Semua', 'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Banten', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat', 'Maluku', 'Maluku Utara', 'Papua Barat', 'Papua'
];

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
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredient, province }),
      })

      if (!generateResponse.ok) {
        throw new Error('Gagal membuat resep. Coba sesaat lagi ya.')
      }

      const recipeData: Recipe = await generateResponse.json()
      setRecipe(recipeData)

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
      setError(err.message || 'Oops, terjadi kesalahan yang tidak terduga.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8 space-y-8">
      <RecipeSearchForm 
        ingredient={ingredient}
        setIngredient={setIngredient}
        province={province}
        setProvince={setProvince}
        handleSearch={handleSearch}
        isLoading={loading}
        provinces={provinces}
      />
      
      <div className="min-h-[300px]">
        <RecipeResult 
            isLoading={loading}
            error={error}
            recipe={recipe}
        />
      </div>
    </div>
  )
}
