"use client"

import RecipeDisplay from "./RecipeDisplay"
import RecipePlaceholder from "./RecipePlaceholder"

interface Recipe {
  recipeName: string
  ingredients: string[]
  steps: string[]
}

interface RecipeResultProps {
  isLoading: boolean
  error: string | null
  recipe: Recipe | null
}

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-10 w-10 text-[#d35a2f]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

export default function RecipeResult({ isLoading, error, recipe }: RecipeResultProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 py-16">
        <LoadingSpinner />
        <p className="mt-4 text-lg">Tunggu sebentar, resep sedang diracik...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-md shadow-md" role="alert">
        <p className="font-bold">Wah, ada sedikit kendala</p>
        <p>{error}</p>
      </div>
    )
  }

  if (recipe) {
    return <RecipeDisplay recipe={recipe} />
  }

  return <RecipePlaceholder />
}
